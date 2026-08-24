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

export type CastLabsEncryptMode = 'ctr' | 'cbc'
export type CastLabsDecryptMode = '1' | '2'

export const CASTLABS_PUB_SETTINGS_KEY = 'castLabsPubSettings'
export const CASTLABS_SUB_SETTINGS_KEY = 'castLabsSubSettings'

export interface CastLabsSettings {
  environment: string
  encryptMode: CastLabsEncryptMode
  merchant: string
  keyId: string
  key: string
  iv: string
}

export interface CastLabsSubSettings {
  environment: string
  encryptMode: CastLabsEncryptMode
  decryptMode: CastLabsDecryptMode
  merchant: string
  keyId: string
  iv: string
}

export interface CastLabsFormElements {
  environmentSelect: HTMLSelectElement
  encryptModeSelect: HTMLSelectElement
  merchantInput: HTMLInputElement
  keyIdInput: HTMLInputElement
  keyInput: HTMLInputElement
  ivInput: HTMLInputElement
}

export interface CastLabsSubFormElements {
  environmentSelect: HTMLSelectElement
  encryptModeSelect: HTMLSelectElement
  decryptModeSelect: HTMLSelectElement
  merchantInput: HTMLInputElement
  keyIdInput: HTMLInputElement
  ivInput: HTMLInputElement
}

function readJsonFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeJsonToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore unavailable localStorage.
  }
}

export function readCastLabsForm(elements: CastLabsFormElements): CastLabsSettings {
  return {
    environment: elements.environmentSelect.value,
    encryptMode: elements.encryptModeSelect.value as CastLabsEncryptMode,
    merchant: elements.merchantInput.value.trim(),
    keyId: elements.keyIdInput.value.trim(),
    key: elements.keyInput.value.trim(),
    iv: elements.ivInput.value.trim(),
  }
}

export function readCastLabsSubForm(elements: CastLabsSubFormElements): CastLabsSubSettings {
  return {
    environment: elements.environmentSelect.value,
    encryptMode: elements.encryptModeSelect.value as CastLabsEncryptMode,
    decryptMode: elements.decryptModeSelect.value as CastLabsDecryptMode,
    merchant: elements.merchantInput.value.trim(),
    keyId: elements.keyIdInput.value.trim(),
    iv: elements.ivInput.value.trim(),
  }
}

export function applyCastLabsForm(elements: CastLabsFormElements, settings: CastLabsSettings): void {
  elements.environmentSelect.value = settings.environment
  elements.encryptModeSelect.value = settings.encryptMode
  elements.merchantInput.value = settings.merchant
  elements.keyIdInput.value = settings.keyId
  elements.keyInput.value = settings.key
  elements.ivInput.value = settings.iv
}

export function applyCastLabsSubForm(
  elements: CastLabsSubFormElements,
  settings: CastLabsSubSettings
): void {
  elements.environmentSelect.value = settings.environment
  elements.encryptModeSelect.value = settings.encryptMode
  elements.decryptModeSelect.value = settings.decryptMode
  elements.merchantInput.value = settings.merchant
  elements.keyIdInput.value = settings.keyId
  elements.ivInput.value = settings.iv
}

export function loadCastLabsPubSettings(): CastLabsSettings | null {
  return readJsonFromStorage<CastLabsSettings>(CASTLABS_PUB_SETTINGS_KEY)
}

export function saveCastLabsPubSettings(settings: CastLabsSettings): void {
  writeJsonToStorage(CASTLABS_PUB_SETTINGS_KEY, settings)
}

export function loadCastLabsSubSettings(): CastLabsSubSettings | null {
  return readJsonFromStorage<CastLabsSubSettings>(CASTLABS_SUB_SETTINGS_KEY)
}

export function saveCastLabsSubSettings(settings: CastLabsSubSettings): void {
  writeJsonToStorage(CASTLABS_SUB_SETTINGS_KEY, settings)
}

export function setCastLabsFormEnabled(elements: CastLabsFormElements, enabled: boolean): void {
  elements.environmentSelect.disabled = !enabled
  elements.encryptModeSelect.disabled = !enabled
  elements.merchantInput.disabled = !enabled
  elements.keyIdInput.disabled = !enabled
  elements.keyInput.disabled = !enabled
  elements.ivInput.disabled = !enabled
}
