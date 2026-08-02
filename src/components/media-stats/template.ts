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

export interface MediaStatsTemplateOptions {
  showBroadcastInfo?: boolean
  showSubscriptionLength?: boolean
}

export function mediaStatsTemplate(
  assetPrefix: string,
  options: MediaStatsTemplateOptions = {}
): string {
  const p = assetPrefix
  const broadcastInfoRows = options.showBroadcastInfo
    ? /* html */ `
  <div class="media-stats__row media-stats__row--broadcast-started">
    <span class="media-stats__label-group">
      <span class="media-stats__label">Broadcast Started</span>
      <button
        type="button"
        class="media-stats__toggle"
        id="broadcast-time-zone-toggle"
        title="Toggle UTC or local time"
      >
        Local
      </button>
    </span>
    <span class="media-stats__value" id="broadcast-started-value">—</span>
  </div>
  <div class="media-stats__row">
    <span class="media-stats__label">Broadcast Length</span>
    <span class="media-stats__value" id="broadcast-length-value">—</span>
  </div>`
    : ''
  const subscriptionLengthRow = options.showSubscriptionLength
    ? /* html */ `
  <div class="media-stats__row">
    <span class="media-stats__label">Subscription Length</span>
    <span class="media-stats__value" id="subscription-length-value">—</span>
  </div>`
    : ''

  return /* html */ `
<link rel="stylesheet" href="${p}style/media-stats.css" />

<div class="media-stats">
  <div class="media-stats__row media-stats__row--endpoint is-hidden" id="endpoint-row">
    <span class="media-stats__label">Endpoint</span>
    <span class="media-stats__value" id="endpoint-value">—</span>
  </div>
  ${broadcastInfoRows}
  ${subscriptionLengthRow}
  <div class="media-stats__row">
    <span class="media-stats__label">Resolution</span>
    <span class="media-stats__value" id="resolution-value">—</span>
  </div>
  <div class="media-stats__row">
    <span class="media-stats__label">Video</span>
    <span class="media-stats__value" id="video-bitrate-value">—</span>
  </div>
  <div class="media-stats__row">
    <span class="media-stats__label">Audio</span>
    <span class="media-stats__value" id="audio-bitrate-value">—</span>
  </div>
</div>
`
}
