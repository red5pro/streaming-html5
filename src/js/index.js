import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux' // eslint-disable-line no-unused-vars
import reducer from './reducers'
import AppContainer from './containers/AppContainer' // eslint-disable-line no-unused-vars

import testbed from "../resource/testbed.json"

const store = createStore(reducer, {
  ...testbed,
  viewFilter: 'Home'
})

// console.log('[index]:\r\n' + JSON.stringify(store.getState(), null, 2))

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
)

