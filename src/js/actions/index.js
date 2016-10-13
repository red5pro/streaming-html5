export const SETTINGS_UPDATE = 'SETTINGS_UPDATE'
export const VIEW_CHANGE = 'VIEW_CHANGE'
export const LOG_LEVEL_CHANGE = 'LOG_LEVEL_CHANGE'

export const changeSetting = (key, value) => ({
  type: SETTINGS_UPDATE,
  key: key,
  value: value
})

export const changeView = (name) => ({
  type: VIEW_CHANGE,
  filter: name
})

export const changeLogLevel = (level) => ({
  type: LOG_LEVEL_CHANGE,
  level: level
})

