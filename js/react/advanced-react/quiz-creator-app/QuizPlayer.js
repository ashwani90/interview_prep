// src/components/QuizPlayer.js
import React, { useEffect, useState } from 'react';

const QuizPlayer = ({ quiz, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState([]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [index]);

  const handleSelect = (selectedIndex) => {
    const timeSpent = (Date.now() - startTime) / 1000;
    setQuestionTimes([...questionTimes, timeSpent]);

    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);

    if (index + 1 < quiz.length) {
      setIndex(index + 1);
    } else {
      onFinish(newAnswers, questionTimes);
    }
  };

  const current = quiz[index];

  return (
    <div className="p-4 border rounded shadow bg-white space-y-4">
      <h2 className="text-lg font-bold">Question {index + 1} of {quiz.length}</h2>
      <p className="text-md">{current.question}</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            className="block w-full text-left px-4 py-2 border rounded hover:bg-blue-100"
            onClick={() => handleSelect(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPlayer;
