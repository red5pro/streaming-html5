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
const DUMMY_IDR_FRAME_SLICE_HDR0 = new Uint8Array([
  0x20, 0x00, 0xcb
]);
const DUMMY_IDR_FRAME_SLICE_HDR1 = new Uint8Array([
  0x10, 0x00, 0x32
]);

// we produce a 320x192 black frame here. Reportedly, smaller resolutions can be problematic with
// HW decoders (f.e. Android fails on anything less than 320x180):
// https://bugs.chromium.org/p/webrtc/issues/detail?id=7206
//
// In our case 180p wouldn't be the best choice as it's encoded as 192p anyway (since
// 180/16 = 11.25 which is rounded up to 12 macroblocks) with a crop rect in SPS

let idrPicIdToggle = 0;
function generateDummyIdrFrame() {
  idrPicIdToggle = !idrPicIdToggle;
  return new Uint8Array([
      0x00, 0x00, 0x00, 0x01, 0x27, 0x64, 0x00, 0x0d, 0xac, 0x57, 0x05, 0x06, 0x64,   // SPS
      0x00, 0x00, 0x00, 0x01, 0x28, 0xee, 0x3c, 0xb0,                                 // PPS
      // start of VCL NALU, up to the point where we put idr_pic_id which needs to toggle between 0 and 1.
      // To be precise, two consecutive IDR pics has to have different idr_pic_id according to the AVC spec,
      // in order to indicate it's a new frame, not a retransmission of the old one.
      0x00, 0x00, 0x00, 0x01, 0x25, 0xb8,
      // idr_pic_id 0 and 1 produce slightly different byte sequences for slice headers
      ...(idrPicIdToggle ? DUMMY_IDR_FRAME_SLICE_HDR0 : DUMMY_IDR_FRAME_SLICE_HDR1),
      // but it quickly converges
      0xff, 0x26, 0x1d, 0xd9, 0x18, 0xc0, 0xa1, 0x60, 0x00, 0x00, 0x0c, 0xe5, 0xae, 0xa6, 0x06, 0x07, 0x14, 0x03, 0x54, 0x00, 0xf7, 0x60, 0xc1, 0xb5, 0xe5, 0x80, 0x00, 0x20, 0x20

  ]).buffer;
}

export default generateDummyIdrFrame;
