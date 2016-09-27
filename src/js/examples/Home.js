import React from 'react'

class Home extends React.Component { // eslint-disable-line no-unused-vars
  render () {
    return <p>Home</p>
  }
}

export default (config) => {
  console.log('[Home.js]\r\n' + JSON.stringify(config));
  return <Home/>
}

