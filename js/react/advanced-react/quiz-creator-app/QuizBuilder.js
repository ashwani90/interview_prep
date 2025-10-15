// src/components/QuizBuilder.js
import React, { useState } from 'react';

const QuizBuilder = ({ onSave }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState({ question: '', options: ['', '', '', ''], answer: 0 });

  const handleOptionChange = (index, value) => {
    const newOptions = [...current.options];
    newOptions[index] = value;
    setCurrent({ ...current, options: newOptions });
  };

  const addQuestion = () => {
    if (current.question && current.options.every(opt => opt.trim())) {
      setQuestions([...questions, current]);
      setCurrent({ question: '', options: ['', '', '', ''], answer: 0 });
    }
  };

  const saveQuiz = () => {
    onSave(questions);
  };

  return (
    <div className="p-4 border rounded shadow bg-white space-y-4">
      <h2 className="text-xl font-semibold">Create Quiz</h2>

      <input
        type="text"
        className="w-full border p-2"
        placeholder="Question"
        value={current.question}
        onChange={e => setCurrent({ ...current, question: e.target.value })}
      />

      {current.options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="radio"
            name="correct"
            checked={current.answer === i}
            onChange={() => setCurrent({ ...current, answer: i })}
          />
          <input
            type="text"
            className="w-full border p-2"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={e => handleOptionChange(i, e.target.value)}
          />
        </div>
      ))}

      <div className="space-x-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addQuestion}>
          Add Question
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={saveQuiz}>
          Save Quiz
        </button>
      </div>

      <p>{questions.length} question(s) added</p>
    </div>
  );
};

export default QuizBuilder;
