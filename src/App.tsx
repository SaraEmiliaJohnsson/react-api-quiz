import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Game from './components/Game';
import Result from './components/Result';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from './features/actions';

enum Screen {
  WELCOME = 'welcome',
  GAME = 'game',
  RESULT = 'result'
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [score, setScore] = useState<number>(0);
  const dispatch = useDispatch();



  const handleShowResult = (score: number) => {
    setScore(score);
    setCurrentScreen(Screen.RESULT);
  }

  const restartQuiz = () => {
    setScore(0);
    setCurrentScreen(Screen.WELCOME);
  }

  const handleCategorySelect = (categoryId: number) => {
    dispatch(setSelectedCategory({ id: categoryId, name: 'Category name' }));
  }

  let content: React.ReactElement | null = null

  switch (currentScreen) {
    case Screen.WELCOME:
      content = <Welcome nextScreen={() => setCurrentScreen(Screen.GAME)} onSelectCategory={handleCategorySelect} />
      break;
    case Screen.GAME:
      content = <Game showResult={handleShowResult} />
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
