import React from 'react';

const Question = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  currentQuestion,
  totalQuestions,
  isLastQuestion
}) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <span>Question {currentQuestion} of {totalQuestions}</span>
      </div>
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        <button
          className="next-button"
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Question;