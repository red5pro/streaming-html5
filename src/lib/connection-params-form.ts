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

export interface ConnectionParamsFormElements {
  rowsContainerEl: HTMLElement
  addButtonEl: HTMLButtonElement
}

export interface ConnectionParamEntry {
  key: string
  value: string
}

let rowIdCounter = 0

function createConnectionParamRow(
  elements: ConnectionParamsFormElements,
  key = '',
  value = ''
): void {
  const rowId = String(++rowIdCounter)
  const rowEl = document.createElement('div')
  rowEl.className = 'connection-params-form__row'
  rowEl.dataset.rowId = rowId

  rowEl.innerHTML = `
    <label class="connection-params-form__field">
      <span class="connection-params-form__label">Key</span>
      <input
        class="connection-params-form__input connection-params-form__input--key"
        type="text"
        placeholder="Parameter key"
        autocomplete="off"
        spellcheck="false"
        value="${escapeAttributeValue(key)}"
      />
    </label>
    <label class="connection-params-form__field connection-params-form__field--grow">
      <span class="connection-params-form__label">Value</span>
      <input
        class="connection-params-form__input connection-params-form__input--value"
        type="text"
        placeholder="Parameter value"
        autocomplete="off"
        spellcheck="false"
        value="${escapeAttributeValue(value)}"
      />
    </label>
    <button
      type="button"
      class="btn btn--ghost connection-params-form__remove-btn"
      aria-label="Remove connection parameter"
      title="Remove"
    >
      Remove
    </button>
  `

  const removeButtonEl = rowEl.querySelector(
    '.connection-params-form__remove-btn'
  ) as HTMLButtonElement
  removeButtonEl.addEventListener('click', () => {
    removeConnectionParamRow(elements, rowEl)
  })

  elements.rowsContainerEl.appendChild(rowEl)
}

function escapeAttributeValue(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function removeConnectionParamRow(
  elements: ConnectionParamsFormElements,
  rowEl: HTMLElement
): void {
  const rows = elements.rowsContainerEl.querySelectorAll('.connection-params-form__row')
  if (rows.length <= 1) {
    const keyInput = rowEl.querySelector('.connection-params-form__input--key') as HTMLInputElement
    const valueInput = rowEl.querySelector(
      '.connection-params-form__input--value'
    ) as HTMLInputElement
    keyInput.value = ''
    valueInput.value = ''
    return
  }

  rowEl.remove()
}

export function addConnectionParamRow(
  elements: ConnectionParamsFormElements,
  key = '',
  value = ''
): void {
  createConnectionParamRow(elements, key, value)
}

export function readConnectionParamEntries(
  elements: ConnectionParamsFormElements
): ConnectionParamEntry[] {
  const entries: ConnectionParamEntry[] = []

  elements.rowsContainerEl.querySelectorAll('.connection-params-form__row').forEach((rowEl) => {
    const keyInput = rowEl.querySelector('.connection-params-form__input--key') as HTMLInputElement
    const valueInput = rowEl.querySelector(
      '.connection-params-form__input--value'
    ) as HTMLInputElement
    const key = keyInput.value.trim()
    if (!key) return
    entries.push({ key, value: valueInput.value })
  })

  return entries
}

export function readConnectionParamsFromForm(
  elements: ConnectionParamsFormElements
): Record<string, string> {
  const params: Record<string, string> = {}
  for (const entry of readConnectionParamEntries(elements)) {
    params[entry.key] = entry.value
  }
  return params
}

export function setConnectionParamsFormEnabled(
  elements: ConnectionParamsFormElements,
  enabled: boolean
): void {
  elements.addButtonEl.disabled = !enabled
  elements.rowsContainerEl.querySelectorAll('.connection-params-form__row').forEach((rowEl) => {
    const keyInput = rowEl.querySelector('.connection-params-form__input--key') as HTMLInputElement
    const valueInput = rowEl.querySelector(
      '.connection-params-form__input--value'
    ) as HTMLInputElement
    const removeButtonEl = rowEl.querySelector(
      '.connection-params-form__remove-btn'
    ) as HTMLButtonElement
    keyInput.disabled = !enabled
    valueInput.disabled = !enabled
    removeButtonEl.disabled = !enabled
  })
}

export function resetConnectionParamsForm(elements: ConnectionParamsFormElements): void {
  elements.rowsContainerEl.replaceChildren()
  rowIdCounter = 0
  addConnectionParamRow(elements)
}

export function wireConnectionParamsForm(elements: ConnectionParamsFormElements): void {
  elements.addButtonEl.addEventListener('click', () => {
    addConnectionParamRow(elements)
  })
  resetConnectionParamsForm(elements)
}

export function formatConnectionParams(params: Record<string, unknown>): string {
  const keys = Object.keys(params)
  if (keys.length === 0) return 'none'
  return keys.map((key) => `${key}=${String(params[key])}`).join(', ')
}
