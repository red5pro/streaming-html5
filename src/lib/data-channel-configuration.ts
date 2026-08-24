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

export type DataChannelMode =
  | 'reliable-ordered'
  | 'reliable-unordered'
  | 'max-retransmits'
  | 'max-lifetime'

export interface DataChannelConfiguration {
  name: string
  ordered?: boolean
  maxRetransmits?: number
  maxPacketLifeTime?: number
}

export interface DataChannelFormElements {
  nameInput: HTMLInputElement
  modeSelect: HTMLSelectElement
  orderedInput: HTMLInputElement
  maxRetransmitsInput: HTMLInputElement
  maxPacketLifeTimeInput: HTMLInputElement
  modeAdvancedOptionsEl: HTMLElement
  maxRetransmitsFieldEl: HTMLElement
  maxPacketLifeTimeFieldEl: HTMLElement
}

export function readDataChannelForm(elements: DataChannelFormElements): DataChannelConfiguration {
  return buildDataChannelConfiguration({
    name: elements.nameInput.value.trim() || 'red5pro',
    mode: elements.modeSelect.value as DataChannelMode,
    ordered: elements.orderedInput.checked,
    maxRetransmits: parseInt(elements.maxRetransmitsInput.value, 10),
    maxPacketLifeTime: parseInt(elements.maxPacketLifeTimeInput.value, 10),
  })
}

export function buildDataChannelConfiguration(values: {
  name: string
  mode: DataChannelMode
  ordered: boolean
  maxRetransmits: number
  maxPacketLifeTime: number
}): DataChannelConfiguration {
  const config: DataChannelConfiguration = {
    name: values.name || 'red5pro',
  }

  if (values.mode === 'max-retransmits') {
    config.ordered = values.ordered
    config.maxRetransmits = Math.max(values.maxRetransmits, 0)
  } else if (values.mode === 'max-lifetime') {
    config.ordered = values.ordered
    config.maxPacketLifeTime = Math.max(values.maxPacketLifeTime, 0)
  } else {
    config.ordered = values.mode === 'reliable-ordered'
  }

  return config
}

export function syncDataChannelModeOptions(elements: DataChannelFormElements): void {
  const mode = elements.modeSelect.value as DataChannelMode
  const showAdvanced = mode === 'max-retransmits' || mode === 'max-lifetime'

  elements.modeAdvancedOptionsEl.classList.toggle('is-hidden', !showAdvanced)
  elements.maxRetransmitsFieldEl.classList.toggle('is-hidden', mode !== 'max-retransmits')
  elements.maxPacketLifeTimeFieldEl.classList.toggle('is-hidden', mode !== 'max-lifetime')
}

export function setDataChannelFormEnabled(
  elements: DataChannelFormElements,
  enabled: boolean
): void {
  elements.nameInput.disabled = !enabled
  elements.modeSelect.disabled = !enabled
  elements.orderedInput.disabled = !enabled
  elements.maxRetransmitsInput.disabled = !enabled
  elements.maxPacketLifeTimeInput.disabled = !enabled
}

export function wireDataChannelForm(elements: DataChannelFormElements): void {
  elements.modeSelect.addEventListener('change', () => syncDataChannelModeOptions(elements))
  syncDataChannelModeOptions(elements)
}
