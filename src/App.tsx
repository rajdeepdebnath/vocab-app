import { useState, useEffect } from 'react'
import './App.css'
import QuizCard from './components/QuizCard'
import ScoreBoard from './components/ScoreBoard'
import { greWords } from './data/greWords'
import { QuizQuestion } from './types/types'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  // Create quiz questions with multiple choice options
  useEffect(() => {
    createNewQuiz();
  }, []);

  const createNewQuiz = () => {
    // Randomly select 10 words from the GRE word list
    const shuffled = [...greWords].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, 10);
    
    // Create questions with options
    const newQuestions = selectedWords.map(word => {
      // Get 3 random definitions from other words to use as wrong options
      const otherWords = greWords.filter(w => w.word !== word.word)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 3);
      
      // All options (1 correct + 3 wrong)
      const options = [word.definition, ...otherWords.map(w => w.definition)];
      
      // Remember the correct option index before shuffling
      const correctOptionIndex = 0;
      
      // Shuffle the options
      const shuffledOptions = [...options];
      const shuffledCorrectIndex = shuffleOptions(shuffledOptions, correctOptionIndex);
      
      return {
        word,
        options: shuffledOptions,
        correctOptionIndex: shuffledCorrectIndex
      };
    });
    
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  // Helper function to shuffle options and track the correct answer
  const shuffleOptions = (options: string[], correctIndex: number): number => {
    const correctOption = options[correctIndex];
    
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Find the new index of the correct option
    return options.findIndex(option => option === correctOption);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // Check if the selected option is correct
    if (optionIndex === questions[currentQuestionIndex].correctOptionIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    createNewQuiz();
  };

  return (
    <div className="app-container">
      <h1>GRE Vocabulary Quiz</h1>
      
      {!quizCompleted && questions.length > 0 ? (
        <>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          <QuizCard 
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
            onNextQuestion={handleNextQuestion}
          />
        </>
      ) : quizCompleted ? (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <ScoreBoard score={score} total={questions.length} />
          <button className="restart-button" onClick={restartQuiz}>
            Take Another Quiz
          </button>
        </div>
      ) : (
        <div className="loading">Loading quiz...</div>
      )}
    </div>
  )
}

export default App
