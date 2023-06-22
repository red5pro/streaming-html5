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
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';const a0_0x1602f2=a0_0x40ca;(function(_0x4f152d,_0x1393d9){const _0x4a9c32=a0_0x40ca,_0x281274=_0x4f152d();while(!![]){try{const _0x19ee1a=parseInt(_0x4a9c32(0x1cb))/0x1+parseInt(_0x4a9c32(0x1d8))/0x2*(parseInt(_0x4a9c32(0x1d1))/0x3)+-parseInt(_0x4a9c32(0x1d2))/0x4+-parseInt(_0x4a9c32(0x1cf))/0x5*(parseInt(_0x4a9c32(0x1db))/0x6)+-parseInt(_0x4a9c32(0x1e0))/0x7*(-parseInt(_0x4a9c32(0x1ce))/0x8)+parseInt(_0x4a9c32(0x1d3))/0x9*(-parseInt(_0x4a9c32(0x1ca))/0xa)+parseInt(_0x4a9c32(0x1d5))/0xb*(-parseInt(_0x4a9c32(0x1dc))/0xc);if(_0x19ee1a===_0x1393d9)break;else _0x281274['push'](_0x281274['shift']());}catch(_0x491c59){_0x281274['push'](_0x281274['shift']());}}}(a0_0x2d0c,0xb811b));import a0_0x343e84 from'./dummyframe.js';function audioTransformFunction(_0x478b68,_0x25ad1d){const _0x23b9e=a0_0x40ca;postMessage({'streamType':_0x23b9e(0x1da),'frame':{'timestamp':_0x478b68[_0x23b9e(0x1d0)],'data':_0x478b68[_0x23b9e(0x1d4)]}}),_0x25ad1d['enqueue'](_0x478b68);}function a0_0x2d0c(){const _0x47f1c3=['RTCTransformEvent','pipeTo','type','5873lNZIEt','130vMtehE','276934imxkFt','pipeThrough','video','7048jovhhs','15eMRVVY','timestamp','123hNBicw','260700UqMeQP','336033EtbmQB','data','1265ESHPTf','onrtctransform','readable','50944siiaMb','options','audio','58974IKjqFx','75804Ulooqs'];a0_0x2d0c=function(){return _0x47f1c3;};return a0_0x2d0c();}function a0_0x40ca(_0x4b58a9,_0x343690){const _0x2d0cd3=a0_0x2d0c();return a0_0x40ca=function(_0x40ca20,_0xed57b3){_0x40ca20=_0x40ca20-0x1ca;let _0x4a140d=_0x2d0cd3[_0x40ca20];return _0x4a140d;},a0_0x40ca(_0x4b58a9,_0x343690);}function videoTransformFunction(_0x585892,_0x4368e3){const _0x56e512=a0_0x40ca;postMessage({'streamType':_0x56e512(0x1cd),'frame':{'type':_0x585892[_0x56e512(0x1df)],'timestamp':_0x585892[_0x56e512(0x1d0)],'data':_0x585892[_0x56e512(0x1d4)]}}),_0x585892[_0x56e512(0x1d4)]=a0_0x343e84(),_0x4368e3['enqueue'](_0x585892);}function handleTransform(_0x489b38,_0x984106,_0x3e54b4){const _0x258133=a0_0x40ca,_0x33f990=new TransformStream({'transform':_0x489b38===_0x258133(0x1da)?audioTransformFunction:videoTransformFunction});_0x984106[_0x258133(0x1cc)](_0x33f990)[_0x258133(0x1de)](_0x3e54b4);}self[a0_0x1602f2(0x1dd)]&&(self[a0_0x1602f2(0x1d6)]=_0x3d36bb=>{const _0x382be4=a0_0x1602f2,_0xe53015=_0x3d36bb['transformer'];handleTransform(_0xe53015[_0x382be4(0x1d9)]['operation'],_0xe53015[_0x382be4(0x1d7)],_0xe53015['writable']);});