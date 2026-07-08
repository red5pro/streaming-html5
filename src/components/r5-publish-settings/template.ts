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

import { RESOLUTION_PRESETS } from '@/lib/publish-presets'

export function publishSettingsTemplate(
  assetPrefix: string,
  screenshare = false,
  audioDisabled = false
): string {
  const p = assetPrefix
  const resolutionOptions = RESOLUTION_PRESETS.map(
    ({ id, label }) => `<option value="${id}">${label}</option>`
  ).join('')

  const videoToggle = screenshare
    ? ''
    : /* html */ `
        <label
          class="theme-toggle publish-settings__toggle"
          id="video-toggle"
          aria-label="Toggle video settings"
          title="Toggle video settings"
        >
          <div class="theme-toggle__track on" id="video-track">
            <div class="theme-toggle__thumb"></div>
          </div>
          <span class="publish-settings__toggle-text">Enable</span>
        </label>`

  const cameraField = screenshare
    ? ''
    : /* html */ `
        <div class="publish-settings__field">
          <label class="publish-settings__label" for="camera-select">Camera</label>
          <div class="publish-settings__select-wrap">
            <select id="camera-select" class="publish-settings__select">
              <option value="">Default camera</option>
            </select>
          </div>
        </div>`

  return /* html */ `
<link rel="stylesheet" href="${p}style/publish-settings.css" />

<section class="publish-settings${screenshare ? ' publish-settings--screenshare' : ''}">
  <h3 class="publish-settings__title">${screenshare ? 'Screenshare Settings' : 'Publish Settings'}</h3>

  <div class="publish-settings__sections">
    <section class="publish-settings__section">
      <div class="publish-settings__section-header">
        <h4 class="publish-settings__section-title">${screenshare ? 'Screen' : 'Video'}</h4>
        ${videoToggle}
      </div>
      <div class="publish-settings__grid publish-settings__dependent-row" id="video-dependent-row">
        ${cameraField}

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="resolution-select">Resolution</label>
          <div class="publish-settings__select-wrap">
            <select id="resolution-select" class="publish-settings__select">
              ${resolutionOptions}
            </select>
          </div>
        </div>

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="bitrate-input">Bitrate (kbps)</label>
          <input
            id="bitrate-input"
            class="publish-settings__input"
            type="number"
            min="100"
            step="50"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="keyframe-input">Keyframe (seconds)</label>
          <input
            id="keyframe-input"
            class="publish-settings__input"
            type="number"
            min="1"
            step="1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </section>

    <section class="publish-settings__section publish-settings__section--audio${audioDisabled ? ' is-hidden' : ''}">
      <div class="publish-settings__section-header">
        <h4 class="publish-settings__section-title">Audio</h4>
        <label
          class="theme-toggle publish-settings__toggle"
          id="audio-toggle"
          aria-label="Toggle audio settings"
          title="Toggle audio settings"
        >
          <div class="theme-toggle__track on" id="audio-track">
            <div class="theme-toggle__thumb"></div>
          </div>
          <span class="publish-settings__toggle-text">Enable</span>
        </label>
      </div>
      <div class="publish-settings__row publish-settings__dependent-row" id="audio-dependent-row">
        <div class="publish-settings__field publish-settings__field--grow">
          <label class="publish-settings__label" for="audio-select">Microphone</label>
          <div class="publish-settings__select-wrap">
            <select id="audio-select" class="publish-settings__select">
              <option value="">Default microphone</option>
            </select>
          </div>
        </div>
      </div>

      <div
        class="publish-settings__grid publish-settings__dependent-row publish-settings__audio-advanced is-hidden"
        id="audio-advanced-row"
      >
        <div class="publish-settings__field">
          <label class="publish-settings__label" for="audio-sample-rate-input">Sample Rate</label>
          <input
            id="audio-sample-rate-input"
            class="publish-settings__input"
            type="number"
            min="1"
            step="1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="audio-sample-size-input">Sample Size</label>
          <input
            id="audio-sample-size-input"
            class="publish-settings__input"
            type="number"
            min="1"
            step="1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="audio-channel-count-input">Channel Count</label>
          <input
            id="audio-channel-count-input"
            class="publish-settings__input"
            type="number"
            min="1"
            step="1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="publish-settings__field">
          <label class="publish-settings__label" for="audio-bitrate-input">Audio Bitrate (Kbps)</label>
          <input
            id="audio-bitrate-input"
            class="publish-settings__input"
            type="number"
            min="1"
            step="1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <label class="publish-settings__checkbox-field">
          <input id="audio-echo-cancellation-input" class="publish-settings__checkbox" type="checkbox" />
          <span class="publish-settings__checkbox-label">Use Echo Cancellation</span>
        </label>

        <label class="publish-settings__checkbox-field">
          <input id="audio-noise-suppression-input" class="publish-settings__checkbox" type="checkbox" />
          <span class="publish-settings__checkbox-label">Use Noise Suppression</span>
        </label>

        <label class="publish-settings__checkbox-field">
          <input id="audio-auto-gain-control-input" class="publish-settings__checkbox" type="checkbox" />
          <span class="publish-settings__checkbox-label">Use Auto Gain Control</span>
        </label>
      </div>
    </section>
  </div>

  <p class="publish-settings__status" id="publish-settings-status"></p>
</section>
`
}
