import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'

enum Screen {
  WELCOME = 'welcome'
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);

  let content: React.ReactElement | null = null

  switch (currentScreen) {
    case Screen.WELCOME:
      content = <Welcome />
      break;
    default:
      content = null;
  }

  return (
    <>
      {content}
    </>
  )
}

export default App
