import './ScoreBoard.css'

interface ScoreBoardProps {
  score: number
  total: number
}

const ScoreBoard = ({ score, total }: ScoreBoardProps) => {
  const percentage = Math.round((score / total) * 100)
  
  let message = ''
  if (percentage >= 90) {
    message = 'Excellent! Your vocabulary is outstanding!'
  } else if (percentage >= 70) {
    message = 'Great job! You have a strong vocabulary.'
  } else if (percentage >= 50) {
    message = 'Good effort! Keep practicing to improve.'
  } else {
    message = 'Keep studying! You\'ll improve with practice.'
  }

  return (
    <div className="score-board">
      <div className="score-circle">
        <div className="score-number">{score}</div>
        <div className="score-total">of {total}</div>
      </div>
      <div className="score-percentage">{percentage}%</div>
      <p className="score-message">{message}</p>
    </div>
  )
}

export default ScoreBoard
