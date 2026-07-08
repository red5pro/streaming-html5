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

export const CASTLABS_WATERMARK_SETTINGS_KEY = 'castLabsWatermarkSettings'

export interface CastLabsWatermarkSettings {
  accessKey: string
  secretKey: string
  organizationUrn: string
  userUrn: string
  watermarkId: number
  numOverlays: number
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

export interface CastLabsWatermarkFormElements {
  accessKeyIdInput: HTMLInputElement
  secretAccessKeyInput: HTMLInputElement
  organizationUrnInput: HTMLInputElement
  userUrnInput: HTMLInputElement
  watermarkIdInput: HTMLInputElement
  overlayCountInput: HTMLInputElement
}

export function readCastLabsWatermarkForm(
  elements: CastLabsWatermarkFormElements
): CastLabsWatermarkSettings {
  return {
    accessKey: elements.accessKeyIdInput.value.trim(),
    secretKey: elements.secretAccessKeyInput.value.trim(),
    organizationUrn: elements.organizationUrnInput.value.trim(),
    userUrn: elements.userUrnInput.value.trim(),
    watermarkId: Number(elements.watermarkIdInput.value),
    numOverlays: Number(elements.overlayCountInput.value),
  }
}

export function applyCastLabsWatermarkForm(
  elements: CastLabsWatermarkFormElements,
  settings: CastLabsWatermarkSettings
): void {
  elements.accessKeyIdInput.value = settings.accessKey
  elements.secretAccessKeyInput.value = settings.secretKey
  elements.organizationUrnInput.value = settings.organizationUrn
  elements.userUrnInput.value = settings.userUrn
  elements.watermarkIdInput.value = String(settings.watermarkId)
  elements.overlayCountInput.value = String(settings.numOverlays)
}

export function loadCastLabsWatermarkSettings(): CastLabsWatermarkSettings | null {
  return readJsonFromStorage<CastLabsWatermarkSettings>(CASTLABS_WATERMARK_SETTINGS_KEY)
}

export function saveCastLabsWatermarkSettings(settings: CastLabsWatermarkSettings): void {
  writeJsonToStorage(CASTLABS_WATERMARK_SETTINGS_KEY, settings)
}

export function setCastLabsWatermarkFormEnabled(
  elements: CastLabsWatermarkFormElements,
  enabled: boolean
): void {
  elements.accessKeyIdInput.disabled = !enabled
  elements.secretAccessKeyInput.disabled = !enabled
  elements.organizationUrnInput.disabled = !enabled
  elements.userUrnInput.disabled = !enabled
  elements.watermarkIdInput.disabled = !enabled
  elements.overlayCountInput.disabled = !enabled
}
