// src/App.js
import React, { useState } from 'react';
import QuizBuilder from './components/QuizBuilder';
import QuizPlayer from './components/QuizPlayer';
import QuizResult from './components/QuizResult';

const App = () => {
  const [quiz, setQuiz] = useState(null);
  const [mode, setMode] = useState('builder');
  const [answers, setAnswers] = useState([]);
  const [times, setTimes] = useState([]);

  const handleQuizSave = (questions) => {
    setQuiz(questions);
    setMode('player');
  };

  const handleFinish = (ans, t) => {
    setAnswers(ans);
    setTimes(t);
    setMode('results');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-3xl mx-auto">
      {mode === 'builder' && <QuizBuilder onSave={handleQuizSave} />}
      {mode === 'player' && <QuizPlayer quiz={quiz} onFinish={handleFinish} />}
      {mode === 'results' && <QuizResult quiz={quiz} answers={answers} times={times} />}
    </div>
  );
};

export default App;
