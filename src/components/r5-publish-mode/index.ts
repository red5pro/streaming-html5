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

import { publicAssetPrefix } from '@/lib/public-path'
import { publishModeTemplate } from './template'

export type StreamMode = 'live' | 'record' | 'append'
export const STREAM_MODE_OPTIONS: StreamMode[] = ['live', 'record', 'append']

export class R5PublishMode extends HTMLElement {
  private shadow: ShadowRoot
  private panelEl!: HTMLElement
  private streamModeSelect!: HTMLSelectElement

  static get observedAttributes(): string[] {
    return ['disabled']
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('.publish-mode')) {
      this.shadow.innerHTML = publishModeTemplate(
        publicAssetPrefix(),
        STREAM_MODE_OPTIONS.map(
          (option) => ({ value: option, label: option.toUpperCase() }),
          'live'
        ),
        // Take this default value from query param `streamMode`
        (new URLSearchParams(window.location.search).get('streamMode') as StreamMode) || 'live'
      )
    }

    this.panelEl = this.shadow.querySelector('.publish-settings') as HTMLElement
    this.streamModeSelect = this.shadow.getElementById('stream-mode-select') as HTMLSelectElement
    this.syncInteractionState()
  }

  attributeChangedCallback(name: string): void {
    if (name === 'disabled') {
      this.syncInteractionState()
    }
  }

  isInteractionDisabled(): boolean {
    return this.hasAttribute('disabled')
  }

  private syncInteractionState(): void {
    const panelDisabled = this.isInteractionDisabled()
    this.streamModeSelect.style.pointerEvents = panelDisabled ? 'none' : ''
    this.panelEl?.classList.toggle('publish-settings--disabled', panelDisabled)
  }

  get streamMode(): string {
    return this.streamModeSelect.value
  }

  set streamMode(value: string) {
    this.streamModeSelect.value = value
  }

  get streamModeOptions(): string[] {
    return STREAM_MODE_OPTIONS
  }

  get enabled(): boolean {
    return !this.hasAttribute('disabled')
  }

  set enabled(value: boolean) {
    if (value) this.removeAttribute('disabled')
    else this.setAttribute('disabled', '')
  }
}

customElements.define('r5-publish-mode', R5PublishMode)
export type R5PublishModeElement = R5PublishMode
