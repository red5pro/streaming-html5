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

export function headerTemplate(assetPrefix: string): string {
  const p = assetPrefix
  return /* html */ `
<link rel="stylesheet" href="${p}style/header.css" />

<div class="header-bar">
  <a class="header-bar__brand" href="${p}index.html">
    <img class="header-bar__brand-logo" src="${p}assets/red5.svg" alt="Red5" />
    WebRTC Testbed
  </a>
  <nav class="header-bar__nav">
    <slot name="nav"></slot>
    <span class="header-bar__version">v__VERSION__</span>
    <button class="toggle-btn" id="settings-toggle" aria-expanded="false">
      <em class="toggle-btn__icon" id="toggle-icon">&#x25BE;</em>
      Settings
    </button>
    <label class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
      <div class="theme-toggle__track" id="theme-track">
        <div class="theme-toggle__thumb"></div>
      </div>
    </label>
  </nav>
</div>

<div class="settings-panel" id="settings-panel">
  <div class="settings-panel__sections">
    <section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">Connection</h4>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__field settings-panel__field--grow">
          <label class="settings-panel__label" for="host-input">Host</label>
          <input
            id="host-input"
            class="settings-panel__input"
            type="text"
            placeholder="your.red5.host"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </section>

<section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">Stream</h4>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__field">
          <label class="settings-panel__label" for="app-input">App</label>
          <input
            id="app-input"
            class="settings-panel__input"
            type="text"
            placeholder="live"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__field">
          <label class="settings-panel__label" for="stream-name-input">Stream Name</label>
          <input
            id="stream-name-input"
            class="settings-panel__input"
            type="text"
            placeholder="stream1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </section>

    <section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">RTC Connection</h4>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__field">
          <label class="settings-panel__label" for="ice-type-select">ICE</label>
          <div class="settings-panel__select-wrap">
            <select id="ice-type-select" class="settings-panel__select">
              <option value="stun">STUN</option>
              <option value="turn">TURN</option>
            </select>
          </div>
        </div>

        <div class="settings-panel__field settings-panel__field--grow">
          <label class="settings-panel__label" for="ice-url-input">URL</label>
          <input
            id="ice-url-input"
            class="settings-panel__input"
            type="text"
            placeholder="stun:stun2.l.google.com:19302"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
        <div class="settings-panel__row settings-panel__dependent-row fill-width" id="ice-turn-row">
          <div class="settings-panel__field">
            <label class="settings-panel__label" for="ice-username-input">Username</label>
            <input
              id="ice-username-input"
              class="settings-panel__input"
              type="text"
              autocomplete="off"
              spellcheck="false"
            />
          </div>

          <div class="settings-panel__field">
            <label class="settings-panel__label" for="ice-credential-input">Credential</label>
            <input
              id="ice-credential-input"
              class="settings-panel__input"
              type="password"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">Stream Manager</h4>
        <label
          class="theme-toggle settings-panel__toggle"
          id="sm-toggle"
          aria-label="Toggle Stream Manager host"
          title="Toggle Stream Manager host"
        >
          <div class="theme-toggle__track" id="sm-track">
            <div class="theme-toggle__thumb"></div>
          </div>
          <span class="settings-panel__toggle-text">Enable</span>
        </label>
      </div>
      <div class="settings-panel__row settings-panel__dependent-row" id="sm-dependent-row">
        <div class="settings-panel__field">
          <label class="settings-panel__label" for="sm-api-version-input">API Version</label>
          <input
            id="sm-api-version-input"
            class="settings-panel__input"
            type="text"
            placeholder="v1"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__field settings-panel__field--grow">
          <label class="settings-panel__label" for="node-group-input">Node Group Name</label>
          <input
            id="node-group-input"
            class="settings-panel__input"
            type="text"
            placeholder="default"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__field settings-panel__field--grow">
          <label class="settings-panel__label" for="sm-region-input">Region</label>
          <input
            id="sm-region-input"
            class="settings-panel__input"
            type="text"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__row settings-panel__dependent-row settings-panel__field--grow" id="sm-admin-row">
          <div class="settings-panel__field">
            <label class="settings-panel__label" for="sm-admin-username-input">Admin Username</label>
            <input
              id="sm-admin-username-input"
              class="settings-panel__input"
              type="text"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
          <div class="settings-panel__field">
            <label class="settings-panel__label" for="sm-admin-password-input">Admin Password</label>
            <div class="settings-panel__password-wrap">
              <input
                id="sm-admin-password-input"
                class="settings-panel__input settings-panel__input--password"
                type="password"
                autocomplete="off"
                spellcheck="false"
              />
              <button
                id="sm-admin-password-toggle"
                class="settings-panel__password-toggle"
                type="button"
                aria-label="Show password"
                aria-pressed="false"
                title="Show password"
              >
                <span aria-hidden="true">&#128065;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">Authentication (RTA)</h4>
        <label
          class="theme-toggle settings-panel__toggle"
          id="auth-toggle"
          aria-label="Toggle authentication settings"
          title="Toggle authentication settings"
        >
          <div class="theme-toggle__track" id="auth-track">
            <div class="theme-toggle__thumb"></div>
          </div>
          <span class="settings-panel__toggle-text">Enable</span>
        </label>
      </div>
      <div class="settings-panel__row settings-panel__dependent-row" id="auth-dependent-row">
        <div class="settings-panel__field">
          <label class="settings-panel__label" for="auth-username-input">Username</label>
          <input
            id="auth-username-input"
            class="settings-panel__input"
            type="text"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__field">
          <label class="settings-panel__label" for="auth-password-input">Password</label>
          <div class="settings-panel__password-wrap">
            <input
              id="auth-password-input"
              class="settings-panel__input settings-panel__input--password"
              type="password"
              autocomplete="off"
              spellcheck="false"
            />
            <button
              id="auth-password-toggle"
              class="settings-panel__password-toggle"
              type="button"
              aria-label="Show password"
              aria-pressed="false"
              title="Show password"
            >
              <span aria-hidden="true">&#128065;</span>
            </button>
          </div>
        </div>

        <div class="settings-panel__field settings-panel__field--grow">
          <label class="settings-panel__label" for="auth-token-input">Token</label>
          <input
            id="auth-token-input"
            class="settings-panel__input"
            type="text"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </section>

    <section class="settings-panel__section">
      <div class="settings-panel__section-header">
        <h4 class="settings-panel__section-title">Statistics</h4>
        <label
          class="theme-toggle settings-panel__toggle"
          id="stats-toggle"
          aria-label="Toggle statistics reporting"
          title="Toggle statistics reporting"
        >
          <div class="theme-toggle__track" id="stats-track">
            <div class="theme-toggle__thumb"></div>
          </div>
          <span class="settings-panel__toggle-text">Enable</span>
        </label>
      </div>
      <div class="settings-panel__row settings-panel__dependent-row" id="stats-dependent-row">
        <div class="settings-panel__field">
          <label class="settings-panel__label" for="stats-interval-input">Interval (seconds)</label>
          <input
            id="stats-interval-input"
            class="settings-panel__input"
            type="number"
            min="1"
            step="1"
            placeholder="5"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <div class="settings-panel__field">
          <label class="settings-panel__label" for="stats-endpoint-select">Endpoint</label>
          <div class="settings-panel__select-wrap">
            <select id="stats-endpoint-select" class="settings-panel__select">
              <option value="data-channel">data-channel</option>
              <option value="event-transport">event-transport</option>
              <option value="url">url</option>
            </select>
          </div>
        </div>
        <div class="settings-panel__row settings-panel__dependent-row fill-width" id="stats-url-row">
          <div class="settings-panel__field settings-panel__field--grow">
            <label class="settings-panel__label" for="stats-url-input">Endpoint URL</label>
            <input
              id="stats-url-input"
              class="settings-panel__input"
              type="text"
              placeholder="https://mydomain.com/stats"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>
    </section>

    <slot name="settings"></slot>
  </div>

  <div class="settings-panel__actions">
    <button class="btn btn--ghost" id="settings-reset">Reset</button>
    <button class="btn btn--primary" id="settings-apply">Apply</button>
  </div>
</div>
`
}
