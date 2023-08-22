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
'use strict';(function(_0x23e14e,_0x41cf28){const _0x42ffd5=a0_0x2a63,_0x468735=_0x23e14e();while(!![]){try{const _0x524d98=-parseInt(_0x42ffd5(0x12b))/0x1*(parseInt(_0x42ffd5(0x12d))/0x2)+-parseInt(_0x42ffd5(0x130))/0x3+-parseInt(_0x42ffd5(0x12e))/0x4+-parseInt(_0x42ffd5(0x134))/0x5*(-parseInt(_0x42ffd5(0x12f))/0x6)+parseInt(_0x42ffd5(0x131))/0x7*(parseInt(_0x42ffd5(0x136))/0x8)+parseInt(_0x42ffd5(0x12c))/0x9+parseInt(_0x42ffd5(0x132))/0xa*(-parseInt(_0x42ffd5(0x135))/0xb);if(_0x524d98===_0x41cf28)break;else _0x468735['push'](_0x468735['shift']());}catch(_0x192758){_0x468735['push'](_0x468735['shift']());}}}(a0_0x7169,0x88a21));const DUMMY_IDR_FRAME_SLICE_HDR0=new Uint8Array([0x20,0x0,0xcb]),DUMMY_IDR_FRAME_SLICE_HDR1=new Uint8Array([0x10,0x0,0x32]);let idrPicIdToggle=0x0;function a0_0x7169(){const _0x1ff5aa=['227909lJsHsY','4039160ubNWuW','791537tBXJQe','8791317hQXvOl','2PJHvHW','421528xmoolt','243498LDVMka','1440141lAKDXb','14hhvYnw','220pPEXCA','buffer','50pXtZGf'];a0_0x7169=function(){return _0x1ff5aa;};return a0_0x7169();}function a0_0x2a63(_0x5c952a,_0x7985c5){const _0x7169f8=a0_0x7169();return a0_0x2a63=function(_0x2a6320,_0x5863ac){_0x2a6320=_0x2a6320-0x12b;let _0x561bbb=_0x7169f8[_0x2a6320];return _0x561bbb;},a0_0x2a63(_0x5c952a,_0x7985c5);}function generateDummyFrame(_0x5ce348){const _0x457848=a0_0x2a63;if(_0x5ce348)return new Uint8Array([0x0,0x0,0x0,0x1,0x41,0x9a,0xff,0xff])['buffer'];return idrPicIdToggle=!idrPicIdToggle,new Uint8Array([0x0,0x0,0x0,0x1,0x27,0x64,0x0,0xd,0xac,0x57,0x5,0x6,0x64,0x0,0x0,0x0,0x1,0x28,0xee,0x3c,0xb0,0x0,0x0,0x0,0x1,0x25,0xb8,...idrPicIdToggle?DUMMY_IDR_FRAME_SLICE_HDR0:DUMMY_IDR_FRAME_SLICE_HDR1,0xff,0x26,0x1d,0xd9,0x18,0xc0,0xa1,0x60,0x0,0x0,0xc,0xe5,0xae,0xa6,0x6,0x7,0x14,0x3,0x54,0x0,0xf7,0x60,0xc1,0xb5,0xe5,0x80,0x0,0x20,0x20])[_0x457848(0x133)];}export default generateDummyFrame;