import { useState } from 'react'
import './App.css'
import QuizCard from './components/QuizCard'
import ScoreBoard from './components/ScoreBoard'
import { greWords } from './data/greWords'

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedWords, setSelectedWords] = useState(() => {
    // Randomly select 10 words from the GRE word list
    const shuffled = [...greWords].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10)
  })

  const handleNextWord = () => {
    setShowAnswer(false)
    if (currentWordIndex < selectedWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleKnewIt = () => {
    setScore(score + 1)
    handleNextWord()
  }

  const handleDidntKnow = () => {
    handleNextWord()
  }

  const restartQuiz = () => {
    // Randomly select 10 new words
    const shuffled = [...greWords].sort(() => 0.5 - Math.random())
    setSelectedWords(shuffled.slice(0, 10))
    setCurrentWordIndex(0)
    setScore(0)
    setShowAnswer(false)
    setQuizCompleted(false)
  }

  return (
    <div className="app-container">
      <h1>GRE Vocabulary Quiz</h1>
      
      {!quizCompleted ? (
        <>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(currentWordIndex / selectedWords.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Word {currentWordIndex + 1} of {selectedWords.length}
          </div>
          
          <QuizCard 
            word={selectedWords[currentWordIndex]} 
            showAnswer={showAnswer}
            onShowAnswer={() => setShowAnswer(true)}
            onKnewIt={handleKnewIt}
            onDidntKnow={handleDidntKnow}
          />
        </>
      ) : (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <ScoreBoard score={score} total={selectedWords.length} />
          <button className="restart-button" onClick={restartQuiz}>
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default App
