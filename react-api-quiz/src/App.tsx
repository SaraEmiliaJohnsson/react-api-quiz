import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Game from './components/Game';
import Result from './components/Result';

enum Screen {
  WELCOME = 'welcome',
  GAME = 'game',
  RESULT = 'result'
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  }

  const handleShowResult = (score: number) => {
    setScore(score);
    setCurrentScreen(Screen.RESULT);
  }

  const restartQuiz = () => {
    setScore(0);
    setCurrentScreen(Screen.WELCOME);
  }

  let content: React.ReactElement | null = null

  switch (currentScreen) {
    case Screen.WELCOME:
      content = <Welcome setCategory={handleCategorySelect} nextScreen={() => setCurrentScreen(Screen.GAME)} />
      break;
    case Screen.GAME:
      content = <Game categoryId={selectedCategoryId!} showResult={handleShowResult} />
      break;
    case Screen.RESULT:
      content = <Result score={score} restartQuiz={restartQuiz} />
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
