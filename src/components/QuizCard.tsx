import { QuizQuestion } from '../types/types'
import './QuizCard.css'

interface QuizCardProps {
  question: QuizQuestion
  selectedOption: number | null
  onSelectOption: (optionIndex: number) => void
  onNextQuestion: () => void
}

const QuizCard = ({ question, selectedOption, onSelectOption, onNextQuestion }: QuizCardProps) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctOptionIndex;

  return (
    <div className="quiz-card">
      <div className="word-container">
        <h2 className="word">{question.word.word}</h2>
        <p className="instruction">Select the correct definition:</p>
        
        <div className="options-container">
          {question.options.map((option, index) => (
            <button 
              key={index}
              onClick={() => !isAnswered && onSelectOption(index)}
              disabled={isAnswered}
              className={`option-btn ${
                isAnswered ? (
                  index === question.correctOptionIndex 
                    ? 'correct-option' 
                    : index === selectedOption 
                      ? 'incorrect-option' 
                      : 'disabled-option'
                ) : ''
              }`}
            >
              {option}
              {isAnswered && index === question.correctOptionIndex && (
                <span className="check-mark">✓</span>
              )}
              {isAnswered && index === selectedOption && index !== question.correctOptionIndex && (
                <span className="x-mark">✗</span>
              )}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <div className="feedback-container">
            {isCorrect ? (
              <div className="correct-feedback">
                <p>Correct! Well done.</p>
              </div>
            ) : (
              <div className="incorrect-feedback">
                <p>Incorrect. The correct definition is:</p>
                <p className="correct-definition">{question.options[question.correctOptionIndex]}</p>
              </div>
            )}
            
            <div className="word-details">
              <p className="example"><em>Example:</em> {question.word.example}</p>
              <div className="synonyms">
                <span>Synonyms: </span>
                {question.word.synonyms.join(', ')}
              </div>
            </div>
            
            <button className="next-btn" onClick={onNextQuestion}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCard
