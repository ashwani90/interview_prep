import React, { useState } from 'react';
import Question from './Question';
import Results from './Results';
import './styles/Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale"
    },
    {
      question: "Which language is used primarily for web development?",
      options: ["Java", "Python", "JavaScript", "C++"],
      correctAnswer: "JavaScript"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNextQuestion = () => {
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswers[currentQuestion];
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswers({});
  };

  return (
    <div className="quiz-container">
      {showResults ? (
        <Results 
          score={score} 
          totalQuestions={questions.length} 
          onRestart={handleRestartQuiz}
        />
      ) : (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedAnswer={selectedAnswers[currentQuestion] || null}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          isLastQuestion={currentQuestion === questions.length - 1}
        />
      )}
    </div>
  );
};

export default Quiz;