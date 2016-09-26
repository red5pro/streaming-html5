import React from 'react'
import {render} from 'react-dom'

import testbed from "../resource/testbed.json"
let json = JSON.stringify(testbed, null, 2)

class App extends React.Component { // eslint-disable-line no-unused-vars
  render () {
    return <p>{json}</p>
  }
}

render(<App/>, document.getElementById('app'))
