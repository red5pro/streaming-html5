/* global TESTBED_VERSION */
// TESTBED_VERSION injected from webpack.
import { Children } from 'react'

const App = ({ page }) => (
  <div>
    <p className="version-field">Testbed Version: {TESTBED_VERSION}</p>
    {Children.only(page)}
  </div>
)

export default App

