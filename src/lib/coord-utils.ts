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

export interface Coordinates {
  x: number
  y: number
  width: number
  height: number
  viewWidth: number
  viewHeight: number
  clientWidth: number
  clientHeight: number
  xscale: number
  yscale: number
  widthPercentage: number
  heightPercentage: number
}

export function getCoordinates(
  viewWidth: number,
  viewHeight: number,
  clientWidth: number,
  clientHeight: number,
  objectFit: string = 'contain'
): Coordinates {
  const viewRatio = viewWidth / viewHeight
  const clientRatio = clientWidth / clientHeight
  let dw,
    dh = 1
  let x,
    y,
    width,
    height = 0
  // Determine the dimensional percentages of the video element to the video itself.
  // Then, based on the `object-fit` style, determine the actualized bounding box coordinates.
  if (objectFit === 'contain') {
    if (viewRatio > clientRatio) {
      dw = 1
      dh = viewHeight / clientHeight / (viewWidth / clientWidth)
    } else {
      dw = viewWidth / clientWidth / (viewHeight / clientHeight)
      dh = 1
    }
    x = clientWidth * (1 - dw) * 0.5
    y = clientHeight * (1 - dh) * 0.5
  } else if (objectFit === 'cover') {
    if (viewRatio > clientRatio) {
      dw = viewWidth / clientWidth / (viewHeight / clientHeight)
      dh = 1
    } else {
      dw = 1
      dh = viewHeight / clientHeight / (viewWidth / clientWidth)
    }

    x = (clientWidth - clientWidth * dw) * 0.5
    y = (clientHeight - clientHeight * dh) * 0.5
  } else {
    dw = viewWidth / clientWidth
    dh = viewHeight / clientHeight
    x = (clientWidth - clientWidth * dw) * 0.5
    y = (clientHeight - clientHeight * dh) * 0.5
  }
  width = clientWidth * dw
  height = clientHeight * dh
  // Return the coordinates.
  return {
    x,
    y,
    width,
    height,
    viewWidth,
    viewHeight,
    clientWidth,
    clientHeight,
    xscale: dw,
    yscale: dh,
    widthPercentage: width / viewWidth,
    heightPercentage: height / viewHeight,
  }
}
