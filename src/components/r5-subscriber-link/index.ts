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
import { subscriberLinkTemplate } from './template'

const DEFAULT_LABEL = 'Open subscriber'

export class R5SubscriberLink extends HTMLElement {
  private shadow: ShadowRoot
  private linkEl!: HTMLAnchorElement
  private onClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault()
    }
  }

  static get observedAttributes(): string[] {
    return ['href', 'disabled', 'label']
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    if (!this.shadow.querySelector('.subscriber-link')) {
      this.shadow.innerHTML = subscriberLinkTemplate(publicAssetPrefix())
    }

    this.linkEl = this.shadow.querySelector('.subscriber-link') as HTMLAnchorElement
    this.linkEl.addEventListener('click', this.onClick)
    this.syncState()
  }

  disconnectedCallback(): void {
    this.linkEl?.removeEventListener('click', this.onClick)
  }

  attributeChangedCallback(): void {
    this.syncState()
  }

  get href(): string {
    return this.getAttribute('href') ?? ''
  }

  set href(value: string) {
    this.setAttribute('href', value)
  }

  get label(): string {
    return this.getAttribute('label') ?? DEFAULT_LABEL
  }

  set label(value: string) {
    this.setAttribute('label', value)
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '')
    else this.removeAttribute('disabled')
  }

  private syncState(): void {
    if (!this.linkEl) return

    const href = this.href
    const disabled = this.disabled

    this.linkEl.textContent = this.label
    this.linkEl.classList.toggle('subscriber-link--disabled', disabled)

    if (disabled) {
      this.linkEl.href = 'javascript:void(0)'
      this.linkEl.setAttribute('aria-disabled', 'true')
      this.linkEl.setAttribute('tabindex', '-1')
      this.linkEl.removeAttribute('target')
      this.linkEl.removeAttribute('rel')
      return
    }

    this.linkEl.href = href
    this.linkEl.target = '_blank'
    this.linkEl.rel = 'noopener noreferrer'
    this.linkEl.removeAttribute('aria-disabled')
    this.linkEl.removeAttribute('tabindex')
  }
}

customElements.define('r5-subscriber-link', R5SubscriberLink)
export type R5SubscriberLinkElement = R5SubscriberLink
