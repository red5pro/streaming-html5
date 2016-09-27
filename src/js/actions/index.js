export const SETTINGS_UPDATE = 'UPDATE'
export const VIEW_SET = 'SET'

export const changeSetting = (key, value) => ({
  type: SETTINGS_UPDATE,
  key: key,
  value: value
})

export const changeView = (name) => ({
  type: VIEW_SET,
  filter: name
})
