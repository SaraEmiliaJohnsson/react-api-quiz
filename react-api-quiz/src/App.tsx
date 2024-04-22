import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Game from './components/Game';

enum Screen {
  WELCOME = 'welcome',
  GAME = 'game',
  RESULT = 'result'
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  }

  let content: React.ReactElement | null = null

  switch (currentScreen) {
    case Screen.WELCOME:
      content = <Welcome setCategory={handleCategorySelect} nextScreen={() => setCurrentScreen(Screen.GAME)} />
      break;
    case Screen.GAME:
      content = <Game categoryId={selectedCategoryId!} />
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
