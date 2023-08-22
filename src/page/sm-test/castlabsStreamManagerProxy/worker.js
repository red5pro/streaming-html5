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
'use strict';const a0_0x4d3d07=a0_0x3053;function a0_0x3053(_0x342b8b,_0xd842b3){const _0xd55c26=a0_0xd55c();return a0_0x3053=function(_0x305310,_0x242ba6){_0x305310=_0x305310-0xa6;let _0x95003f=_0xd55c26[_0x305310];return _0x95003f;},a0_0x3053(_0x342b8b,_0xd842b3);}(function(_0x46ef06,_0xf28126){const _0x5e51f7=a0_0x3053,_0x25550b=_0x46ef06();while(!![]){try{const _0x34811d=-parseInt(_0x5e51f7(0xb3))/0x1*(parseInt(_0x5e51f7(0xb5))/0x2)+parseInt(_0x5e51f7(0xaf))/0x3*(parseInt(_0x5e51f7(0xb6))/0x4)+-parseInt(_0x5e51f7(0xa8))/0x5*(-parseInt(_0x5e51f7(0xb4))/0x6)+parseInt(_0x5e51f7(0xb9))/0x7+-parseInt(_0x5e51f7(0xa9))/0x8+-parseInt(_0x5e51f7(0xaa))/0x9*(-parseInt(_0x5e51f7(0xb7))/0xa)+parseInt(_0x5e51f7(0xa6))/0xb*(parseInt(_0x5e51f7(0xad))/0xc);if(_0x34811d===_0xf28126)break;else _0x25550b['push'](_0x25550b['shift']());}catch(_0x19435d){_0x25550b['push'](_0x25550b['shift']());}}}(a0_0xd55c,0xa369a));import a0_0x5a84f8 from'./dummyframe.js';function audioTransformFunction(_0x4af434,_0x124221){const _0x1093d5=a0_0x3053;postMessage({'streamType':_0x1093d5(0xab),'frame':{'timestamp':_0x4af434[_0x1093d5(0xbc)],'data':_0x4af434['data']}}),_0x124221[_0x1093d5(0xba)](_0x4af434);}let keyFrameNeeded=![];function videoTransformFunction(_0x3a9050,_0x4ee9b9){const _0x286880=a0_0x3053;postMessage({'streamType':_0x286880(0xae),'frame':{'type':_0x3a9050[_0x286880(0xbe)],'timestamp':_0x3a9050[_0x286880(0xbc)],'data':_0x3a9050['data']}});if(_0x3a9050['type']===_0x286880(0xb2))keyFrameNeeded=![];_0x3a9050[_0x286880(0xb8)]=a0_0x5a84f8(keyFrameNeeded),keyFrameNeeded=![],_0x4ee9b9[_0x286880(0xba)](_0x3a9050);}function handleTransform(_0x182207,_0x13161c,_0x3093e2){const _0x24c8c3=a0_0x3053,_0x4eb4e7=new TransformStream({'transform':_0x182207===_0x24c8c3(0xab)?audioTransformFunction:videoTransformFunction});_0x13161c[_0x24c8c3(0xbb)](_0x4eb4e7)['pipeTo'](_0x3093e2);}self[a0_0x4d3d07(0xb1)]&&(self[a0_0x4d3d07(0xb0)]=_0x7ab7a0=>{const _0x487449=a0_0x4d3d07,_0x51cdd9=_0x7ab7a0[_0x487449(0xac)];handleTransform(_0x51cdd9[_0x487449(0xa7)][_0x487449(0xbd)],_0x51cdd9['readable'],_0x51cdd9['writable']);});onmessage=_0x2ff650=>{const _0x4ab1cb=a0_0x4d3d07;keyFrameNeeded=_0x2ff650[_0x4ab1cb(0xb8)];};function a0_0xd55c(){const _0x44d982=['3814132IWIuOY','enqueue','pipeThrough','timestamp','operation','type','11DzdvOH','options','15PMIvcz','9919392BoDzKB','162QGsqRS','audio','transformer','723852eXAzlc','video','102699nVszQR','onrtctransform','RTCTransformEvent','key','2YGFsJs','1014612OwZhNj','1180526VIQFzU','92QRJRFs','661070VTyuzE','data'];a0_0xd55c=function(){return _0x44d982;};return a0_0xd55c();}