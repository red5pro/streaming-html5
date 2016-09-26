import React from 'react'
import {render} from 'react-dom'
// import ReactDOM from 'react-dom'
// const render = ReactDOM.render

class App extends React.Component {
  render () {
    return <p> Hello React!</p>
  }
}

render(<App/>, document.getElementById('app'))
