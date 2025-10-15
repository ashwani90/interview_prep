// src/components/QuizResult.js
import React from 'react';

const QuizResult = ({ quiz, answers, times }) => {
  const correctCount = answers.reduce((acc, ans, i) =>
    ans === quiz[i].answer ? acc + 1 : acc, 0);

  return (
    <div className="p-4 border rounded shadow bg-white space-y-4">
      <h2 className="text-xl font-bold">Quiz Results</h2>
      <p>Score: {correctCount} / {quiz.length}</p>

      <h3 className="text-md font-semibold">Details:</h3>
      <ul className="space-y-2">
        {quiz.map((q, i) => (
          <li key={i} className="border-b pb-2">
            <p><strong>Q{i + 1}:</strong> {q.question}</p>
            <p>
              Your Answer: {q.options[answers[i]] || 'N/A'}<br />
              Correct Answer: {q.options[q.answer]}<br />
              Time Taken: {times[i]?.toFixed(2)}s
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResult;
