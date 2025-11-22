import React from 'react';

const Results = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="score-section">
        <p>You scored {score} out of {totalQuestions}</p>
        <p>That's {percentage}%</p>
        <div className="score-bar">
          <div 
            className="score-progress" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;