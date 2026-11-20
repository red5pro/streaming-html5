/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code")
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation
files (collectively, the "Software") without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.
An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const {test} = require('node:test');
const assert = require('node:assert/strict');
require('../src/examples/whep-redundant/session.js');

function peer(id, mode = 'standby') {
  const calls = [];
  const dc = {readyState:'open'};
  const result = {id,address:`192.0.2.${id === 'a' ? 1 : 2}`,pcId:`pc-${id}`,ready:true,controlReady:true,
    requested:mode,requestedAt:0,lastVideoAt:10000,createdAt:0,connectionState:'connected',bytes:10,frames:10,samples:10,energy:1,
    redFrames:0,blueFrames:0,firstToneObservations:0,secondToneObservations:0,mutedWindows:0,
    video:{muted:true,play:async()=>{},srcObject:null},container:{remove(){calls.push('remove');}},
    pc:{connectionState:'connected',getStats:async()=>new Map(),getReceivers:()=>[],close(){calls.push('close');}},
    subscriber:{getDataChannel:()=>dc,getMediaStream:()=>null,enableStandby(){calls.push('standby');},
      disableStandby(){calls.push('active');},off(){},unsubscribe:async()=>{calls.push('unsubscribe');}}};
  return {peer:result,calls,dc};
}
function session(peers = []) {
  const result = new RedundantWhepSession({sdk:{},mount:{},now:()=>10000,fetcher:async()=>{throw new Error('Unexpected network access');}});
  result.running = true; result.config = {sm:'https://sm.example',nodeGroup:'test',streamGuid:'live/stream1',endpoints:2,strict:true,silenceSeconds:5};
  result.peers = peers; result.activeId = peers.find(p=>p.requested === 'active')?.id ?? null;
  return result;
}

test('promotion uses server controls and preserves both PeerConnections', async()=>{
  const a = peer('a','active'), b = peer('b'); const s = session([a.peer,b.peer]); s.audioEnabled = true;
  const original = b.peer.pc;
  await s.promote('b');
  assert.equal(s.activeId,'b'); assert.deepEqual(a.calls,['standby']); assert.deepEqual(b.calls,['active']);
  assert.equal(a.peer.video.muted,true); assert.equal(b.peer.video.muted,false); assert.equal(b.peer.pc,original);
  assert.equal(a.peer.requested,'standby'); assert.equal(b.peer.requested,'active');
});
test('closed control channels cannot be promoted',async()=>{
  const b = peer('b'); b.dc.readyState = 'closed'; const s = session([b.peer]);
  await assert.rejects(s.promote('b'),/not ready/); assert.deepEqual(b.calls,[]);
});
test('stream paths stay with their peers across upstream changes and promotion', async () => {
  const a = peer('a', 'active');
  const b = peer('b');
  const s = session([a.peer, b.peer]);
  const original = a.peer.pc;
  const first = { hops: ['origin-a', 'relay-a', a.peer.address], complete: true, revision: 10 };
  const alternate = { hops: ['origin-b', 'relay-b', 'relay-c', b.peer.address], complete: true, revision: 3 };
  s.observeStreamPath(a.peer, first);
  s.observeStreamPath(b.peer, alternate);
  s.observeStreamPath(a.peer, { ...first, hops: ['origin-b', 'relay-a', a.peer.address], revision: 11 });
  s.observeStreamPath(a.peer, first);
  s.observeStreamPath(a.peer, { hops: [], complete: true, revision: 12 });
  assert.equal(a.peer.pc, original);
  assert.deepEqual(s.snapshot().peers.map(p => p.streamPath.hops[0]), ['origin-b', 'origin-b']);
  const changes = s.snapshot().events.filter(e => e.type === 'stream-path-changed');
  assert.equal(changes.length, 3);
  assert.deepEqual(changes[2].previous, first);
  assert.equal(changes[2].videoFrames, a.peer.frames);
  await s.promote(b.peer.id);
  const active = s.snapshot().peers.find(p => p.id === s.activeId);
  assert.deepEqual(active.streamPath, alternate);
});
test('silent audio analysis resumes without unmuting playback through promotions',async()=>{
  const a = peer('a','active'), b = peer('b'); const s = session([a.peer,b.peer]);
  s.config.silentAudio = true;
  let resumed = 0;
  s.audioContext = {resume:async()=>{resumed++;}};
  await s.enableAudio();
  assert.equal(resumed,1); assert.equal(s.audioEnabled,true);
  assert.equal(a.peer.video.muted,true); assert.equal(b.peer.video.muted,true);
  await s.promote('b');
  assert.equal(s.activeId,'b'); assert.equal(a.peer.video.muted,true); assert.equal(b.peer.video.muted,true);
  assert.deepEqual(b.calls,['active']);
});
test('strict and SubGroup preferences reach endpoint selection',async()=>{
  const s = session(); s.config.subGroup = 'region-one'; s.config.region = 'region'; s.config.apiVersion = 'v2'; let selected;
  s.fetcher = async url=>{selected = url; return {ok:true,json:async()=>[{serverAddress:'192.0.2.1'},{serverAddress:'192.0.2.2'}]};};
  await s.routes();
  assert.equal(selected.searchParams.get('endpoints'),'2'); assert.equal(selected.searchParams.get('strict'),'true');
  assert.equal(selected.searchParams.get('subgroup'),'region-one');
  assert.equal(selected.searchParams.get('region'),'region');
  assert.equal(selected.pathname,'/as/v2/streams/stream/test/subscribe/live/stream1');
});
test('duplicate endpoints fail before opening subscriptions',async()=>{
  const s = session(); s.fetcher = async()=>({ok:true,json:async()=>[{serverAddress:'192.0.2.1'},{serverAddress:'192.0.2.1'}]});
  await assert.rejects(s.routes(),/distinct/);
});
test('default browser fetch retains its Window receiver',async()=>{
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async function() {
      assert.equal(this,globalThis);
      return {ok:true,json:async()=>[{serverAddress:'192.0.2.1'},{serverAddress:'192.0.2.2'}]};
    };
    const s = new RedundantWhepSession({sdk:{},mount:{}}); s.config = session().config; s.running = true;
    assert.equal((await s.routes()).length,2);
  } finally { globalThis.fetch = original; }
});
test('waits for strict endpoint reporting without relaxing selection',async()=>{
  let clock = 0, calls = 0;
  const s = new RedundantWhepSession({sdk:{},mount:{},now:()=>clock,pause:async ms=>{clock+=ms;},
    fetcher:async url=>{
      assert.equal(url.searchParams.get('strict'),'true'); calls++;
      return calls === 1 ? {ok:false,status:404} : {ok:true,json:async()=>[{serverAddress:'192.0.2.1'},{serverAddress:'192.0.2.2'}]};
    }});
  s.config = session().config; s.running = true;
  assert.equal((await s.routes()).length,2); assert.equal(calls,2);
});
test('routing wait fails within its deadline',async()=>{
  let clock=0;
  const s=new RedundantWhepSession({sdk:{},mount:{},now:()=>clock,pause:async ms=>{clock+=ms;},fetcher:async()=>({ok:false,status:404})});
  s.config={...session().config,routingWaitSeconds:2}; s.running=true;
  await assert.rejects(s.routes(),/routing HTTP 404/); assert.equal(clock,2000);
});
test('quiet standby is observed without treating it as a failed active viewer',async()=>{
  const a = peer('a','active'), b = peer('b'); const s = session([a.peer,b.peer]);
  a.peer.analyser = b.peer.analyser = {disconnect(){}}; s.audioContext = {state:'suspended'};
  a.peer.pc.getStats = b.peer.pc.getStats = async()=>new Map([['video',{type:'inbound-rtp',kind:'video',bytesReceived:10,framesDecoded:10}]]);
  for(let i=0;i<6;i++) await s.poll();
  assert.equal(b.peer.mutedWindows,6); assert.equal(s.activeId,'a'); assert.deepEqual(b.calls,[]);
});
test('active silence promotes the ready existing standby and closes the lost peer',async()=>{
  const a = peer('a','active'), b = peer('b'); const s = session([a.peer,b.peer]);
  a.peer.analyser = b.peer.analyser = {disconnect(){}}; s.audioContext = {state:'suspended'}; a.peer.lastVideoAt = 0;
  s.replenish = ()=>{}; const existing = b.peer.pc;
  await s.poll();
  assert.equal(s.activeId,'b'); assert.equal(b.peer.pc,existing); assert.deepEqual(b.calls,['active']);
  assert.ok(a.calls.includes('close')); assert.ok(a.calls.includes('unsubscribe')); assert.equal(a.peer.retired,true);
});
test('stop closes every connection and removes every media element',async()=>{
  const a=peer('a','active'), b=peer('b'); const s=session([a.peer,b.peer]);
  await s.stop(); assert.equal(s.running,false); assert.equal(s.activeId,null); assert.deepEqual(s.peers,[]);
  for(const item of [a,b]) { assert.ok(item.calls.includes('close')); assert.ok(item.calls.includes('unsubscribe')); assert.ok(item.calls.includes('remove')); }
});
test('audio analysis has a scheduled output path with zero gain',()=>{
  const original = globalThis.AudioContext;
  const connections = [];
  const destination = {}, gain = {gain:{value:1},connect:node=>connections.push(['gain',node])};
  const analyser = {connect:node=>connections.push(['analyser',node])};
  const source = {connect:node=>connections.push(['source',node])};
  try {
    globalThis.AudioContext = class {
      destination = destination;
      createGain() { return gain; }
      createAnalyser() { return analyser; }
      createMediaStreamSource() { return source; }
    };
    const a = peer('a','active'); a.peer.subscriber.getMediaStream=()=>({getAudioTracks:()=>[{}]});
    const s = session([a.peer]);
    s.observeAudio(a.peer);
    assert.equal(gain.gain.value,0);
    assert.deepEqual(connections,[['gain',destination],['source',analyser],['analyser',gain]]);
  } finally { globalThis.AudioContext = original; }
});
test('received packets and concealed samples cannot advance a stale tone observation',async()=>{
  const a = peer('a','active'), s = session([a.peer]); s.replenish=()=>{};
  s.audioContext={state:'running',sampleRate:48000};
  a.peer.analyser={frequencyBinCount:1024,fftSize:2048,getFloatFrequencyData(values){values.fill(-100);values[Math.round(1000*2048/48000)]=-20;}};
  let bytes=100, emitted=0;
  a.peer.pc.getStats=async()=>new Map([['audio',{type:'inbound-rtp',kind:'audio',bytesReceived:bytes,totalSamplesReceived:5000,jitterBufferEmittedCount:emitted}]]);
  await s.poll(); assert.equal(a.peer.firstToneObservations,0);
  bytes=200; emitted=960;
  await s.poll(); assert.equal(a.peer.firstToneObservations,1);
  bytes=300;
  await s.poll(); assert.equal(a.peer.firstToneObservations,1);
});
