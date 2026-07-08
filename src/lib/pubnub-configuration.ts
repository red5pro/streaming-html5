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

export type PubNubAuthOption = 'cloud-endpoint' | 'backend-url' | 'auth-token'

export interface PubNubInitConfig {
  userId: string
  publishKey?: string
  subscribeKey?: string
  authToken?: string
  cloudEndpoint?: string
  backendUrl?: string
  expiryMinutes: number
  channelId: string
  logLevel: string
}

export interface PubNubFormElements {
  cloudEndpointRadio: HTMLInputElement
  backendUrlRadio: HTMLInputElement
  authTokenRadio: HTMLInputElement
  cloudEndpointInput: HTMLInputElement
  backendUrlInput: HTMLInputElement
  authTokenInput: HTMLInputElement
  channelIdInput: HTMLInputElement
  userIdInput: HTMLInputElement
  publishKeyInput: HTMLInputElement
  subscribeKeyInput: HTMLInputElement
}

export function generateUserId(): string {
  return `user-${Math.floor(Math.random() * 0x1000).toString(16)}`
}

export function getSelectedAuthOption(elements: PubNubFormElements): PubNubAuthOption {
  if (elements.backendUrlRadio.checked) return 'backend-url'
  if (elements.authTokenRadio.checked) return 'auth-token'
  return 'cloud-endpoint'
}

export function readPubNubInitConfig(elements: PubNubFormElements): PubNubInitConfig {
  const authOption = getSelectedAuthOption(elements)
  const config: PubNubInitConfig = {
    userId: elements.userIdInput.value.trim() || generateUserId(),
    publishKey: elements.publishKeyInput.value.trim() || undefined,
    subscribeKey: elements.subscribeKeyInput.value.trim() || undefined,
    channelId: elements.channelIdInput.value.trim() || 'red5',
    expiryMinutes: 120,
    logLevel: 'trace',
  }

  const cloudEndpoint = elements.cloudEndpointInput.value.trim()
  const backendUrl = elements.backendUrlInput.value.trim()
  const authToken = elements.authTokenInput.value.trim()

  if (authOption === 'cloud-endpoint' && cloudEndpoint) {
    config.cloudEndpoint = cloudEndpoint
  } else if (authOption === 'backend-url' && backendUrl) {
    config.backendUrl = backendUrl
  } else if (authOption === 'auth-token' && authToken) {
    config.authToken = authToken
  }

  return config
}

export function validatePubNubForm(
  elements: PubNubFormElements
): { valid: true } | { valid: false; message: string } {
  if (!elements.publishKeyInput.value.trim()) {
    return { valid: false, message: 'Publish Key is required.' }
  }
  if (!elements.subscribeKeyInput.value.trim()) {
    return { valid: false, message: 'Subscribe Key is required.' }
  }
  if (!elements.channelIdInput.value.trim()) {
    return { valid: false, message: 'Channel ID is required.' }
  }
  if (!elements.userIdInput.value.trim()) {
    return { valid: false, message: 'User ID is required.' }
  }

  const authOption = getSelectedAuthOption(elements)
  if (authOption === 'cloud-endpoint' && !elements.cloudEndpointInput.value.trim()) {
    return { valid: false, message: 'Cloud Endpoint is required for the selected auth option.' }
  }
  if (authOption === 'backend-url' && !elements.backendUrlInput.value.trim()) {
    return { valid: false, message: 'Backend Service URL is required for the selected auth option.' }
  }
  if (authOption === 'auth-token' && !elements.authTokenInput.value.trim()) {
    return { valid: false, message: 'Auth Token is required for the selected auth option.' }
  }

  return { valid: true }
}

export function syncPubNubAuthInputs(elements: PubNubFormElements): void {
  const authOption = getSelectedAuthOption(elements)
  elements.cloudEndpointInput.disabled = authOption !== 'cloud-endpoint'
  elements.backendUrlInput.disabled = authOption !== 'backend-url'
  elements.authTokenInput.disabled = authOption !== 'auth-token'
}

export function setPubNubFormEnabled(elements: PubNubFormElements, enabled: boolean): void {
  elements.cloudEndpointRadio.disabled = !enabled
  elements.backendUrlRadio.disabled = !enabled
  elements.authTokenRadio.disabled = !enabled
  elements.channelIdInput.disabled = !enabled
  elements.userIdInput.disabled = !enabled
  elements.publishKeyInput.disabled = !enabled
  elements.subscribeKeyInput.disabled = !enabled

  if (enabled) {
    syncPubNubAuthInputs(elements)
    return
  }

  elements.cloudEndpointInput.disabled = true
  elements.backendUrlInput.disabled = true
  elements.authTokenInput.disabled = true
}

export function wirePubNubForm(elements: PubNubFormElements): void {
  const onAuthChange = (): void => syncPubNubAuthInputs(elements)
  elements.cloudEndpointRadio.addEventListener('change', onAuthChange)
  elements.backendUrlRadio.addEventListener('change', onAuthChange)
  elements.authTokenRadio.addEventListener('change', onAuthChange)
  syncPubNubAuthInputs(elements)
}
