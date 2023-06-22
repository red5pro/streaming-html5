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
(function(_0x56a7e7,_0x15bb25){const _0x18d32d=a0_0x3601,_0x3fbf40=_0x56a7e7();while(!![]){try{const _0x361589=parseInt(_0x18d32d(0xed))/0x1*(parseInt(_0x18d32d(0xee))/0x2)+parseInt(_0x18d32d(0xea))/0x3*(parseInt(_0x18d32d(0xf2))/0x4)+parseInt(_0x18d32d(0xe6))/0x5*(parseInt(_0x18d32d(0xf0))/0x6)+-parseInt(_0x18d32d(0xeb))/0x7+-parseInt(_0x18d32d(0xec))/0x8*(parseInt(_0x18d32d(0xe8))/0x9)+parseInt(_0x18d32d(0xe9))/0xa+parseInt(_0x18d32d(0xe7))/0xb*(-parseInt(_0x18d32d(0xef))/0xc);if(_0x361589===_0x15bb25)break;else _0x3fbf40['push'](_0x3fbf40['shift']());}catch(_0x31febe){_0x3fbf40['push'](_0x3fbf40['shift']());}}}(a0_0x4c09,0x5bd2f));function a0_0x3601(_0x355d7a,_0x29002e){const _0x4c09a8=a0_0x4c09();return a0_0x3601=function(_0x3601bf,_0x5e6925){_0x3601bf=_0x3601bf-0xe6;let _0x33d0c8=_0x4c09a8[_0x3601bf];return _0x33d0c8;},a0_0x3601(_0x355d7a,_0x29002e);}const DUMMY_IDR_FRAME_SLICE_HDR0=new Uint8Array([0x20,0x0,0xcb]),DUMMY_IDR_FRAME_SLICE_HDR1=new Uint8Array([0x10,0x0,0x32]);let idrPicIdToggle=0x0;function a0_0x4c09(){const _0x35d978=['1212vFKRds','3938424cPDpeK','2609720sPsCzb','9774vpFqQj','66SkuWRp','180EfgdPj','290838GuFZXQ','buffer','4432zOIsvD','55zYqxyQ','168751RZqlAU','18fxUHSB','5179110ezSyRD'];a0_0x4c09=function(){return _0x35d978;};return a0_0x4c09();}function generateDummyIdrFrame(){const _0x4eb36e=a0_0x3601;return idrPicIdToggle=!idrPicIdToggle,new Uint8Array([0x0,0x0,0x0,0x1,0x27,0x64,0x0,0xd,0xac,0x57,0x5,0x6,0x64,0x0,0x0,0x0,0x1,0x28,0xee,0x3c,0xb0,0x0,0x0,0x0,0x1,0x25,0xb8,...idrPicIdToggle?DUMMY_IDR_FRAME_SLICE_HDR0:DUMMY_IDR_FRAME_SLICE_HDR1,0xff,0x26,0x1d,0xd9,0x18,0xc0,0xa1,0x60,0x0,0x0,0xc,0xe5,0xae,0xa6,0x6,0x7,0x14,0x3,0x54,0x0,0xf7,0x60,0xc1,0xb5,0xe5,0x80,0x0,0x20,0x20])[_0x4eb36e(0xf1)];}export default generateDummyIdrFrame;