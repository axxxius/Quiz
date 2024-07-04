import { useState } from 'react'

import Logo from './assets/react.svg?react'

const App = () => {
  const [a, setA] = useState(0)

  return (
    <div>
      <button onClick={() => setA((prev) => prev + 1)}>+1</button>
      <div>{a}</div>
      <Logo />
    </div>
  )
}

export default App
