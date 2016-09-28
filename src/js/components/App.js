import { Children } from 'react'

const App = ({ page }) => (
  <div>
    {Children.only(page)}
  </div>
)

export default App

