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

export interface ResolutionPreset {
  id: string
  label: string
  width: number
  height: number
  defaultBitrateKbps: number
}

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  { id: '1280x720', label: '1280p (1280×720)', width: 1280, height: 720, defaultBitrateKbps: 2500 },
  { id: '960x540', label: '960×540', width: 960, height: 540, defaultBitrateKbps: 1500 },
  { id: '854x480', label: '854×480', width: 854, height: 480, defaultBitrateKbps: 1200 },
  { id: '640x480', label: '640×480', width: 640, height: 480, defaultBitrateKbps: 1000 },
  { id: '640x360', label: '360p (640×360)', width: 640, height: 360, defaultBitrateKbps: 800 },
]

export const DEFAULT_RESOLUTION_ID = RESOLUTION_PRESETS[0].id
export const DEFAULT_KEYFRAME_INTERVAL_SECONDS = 2
export const DEFAULT_AUDIO_BITRATE_KBPS = 56

export function getResolutionPreset(id: string): ResolutionPreset {
  return RESOLUTION_PRESETS.find((preset) => preset.id === id) ?? RESOLUTION_PRESETS[0]
}
