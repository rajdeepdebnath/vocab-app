import { GREWord } from '../types/types'
import './QuizCard.css'

interface QuizCardProps {
  word: GREWord
  showAnswer: boolean
  onShowAnswer: () => void
  onKnewIt: () => void
  onDidntKnow: () => void
}

const QuizCard = ({ word, showAnswer, onShowAnswer, onKnewIt, onDidntKnow }: QuizCardProps) => {
  return (
    <div className="quiz-card">
      <div className="word-container">
        <h2 className="word">{word.word}</h2>
        {!showAnswer ? (
          <button className="show-answer-btn" onClick={onShowAnswer}>
            Show Definition
          </button>
        ) : (
          <div className="answer-container">
            <p className="definition">{word.definition}</p>
            <p className="example"><em>Example:</em> {word.example}</p>
            <div className="synonyms">
              <span>Synonyms: </span>
              {word.synonyms.join(', ')}
            </div>
            <div className="buttons-container">
              <button className="knew-it-btn" onClick={onKnewIt}>
                I Knew It
              </button>
              <button className="didnt-know-btn" onClick={onDidntKnow}>
                Didn't Know
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCard
