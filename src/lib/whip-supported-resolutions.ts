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

export interface WhipSupportedResolution {
  id: string
  label: string
  width: number
  height: number
  frameRate: number
  bitrateKbps: number
}

export const WHIP_SUPPORTED_RESOLUTIONS: WhipSupportedResolution[] = [
  {
    id: '4K',
    label: '4k (3840×2160)',
    width: 3840,
    height: 2160,
    frameRate: 60,
    bitrateKbps: 10000,
  },
  {
    id: '1080p',
    label: '1080p (1920×1080)',
    width: 1920,
    height: 1080,
    frameRate: 30,
    bitrateKbps: 4500,
  },
  {
    id: '720p',
    label: '720p (1280×720)',
    width: 1280,
    height: 720,
    frameRate: 30,
    bitrateKbps: 2500,
  },
  {
    id: '540p',
    label: '540p (960×540)',
    width: 960,
    height: 540,
    frameRate: 30,
    bitrateKbps: 1500,
  },
  {
    id: '480p',
    label: '480p (854×480)',
    width: 854,
    height: 480,
    frameRate: 30,
    bitrateKbps: 1200,
  },
  {
    id: 'vga',
    label: 'VGA (640×480)',
    width: 640,
    height: 480,
    frameRate: 30,
    bitrateKbps: 1000,
  },
  {
    id: '360p',
    label: '360p (640×360)',
    width: 640,
    height: 360,
    frameRate: 30,
    bitrateKbps: 800,
  },
  {
    id: '240p',
    label: '240p (426×240)',
    width: 426,
    height: 240,
    frameRate: 15,
    bitrateKbps: 400,
  },
  {
    id: '180p',
    label: '180p (320×180)',
    width: 320,
    height: 180,
    frameRate: 15,
    bitrateKbps: 250,
  },
]

export function getWhipSupportedResolution(id: string): WhipSupportedResolution | undefined {
  return WHIP_SUPPORTED_RESOLUTIONS.find((preset) => preset.id === id)
}
