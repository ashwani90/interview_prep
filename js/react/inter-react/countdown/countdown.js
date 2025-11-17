import React, { useState, useEffect, useRef } from "react";
import "./CountdownTimer.css";

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused && timeLeft !== null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, targetDate]);

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(calculateTimeLeft());
    setIsPaused(false);
  };

  if (!timeLeft) {
    return <div className="timer-finished">Time's up!</div>;
  }

  return (
    <div className="countdown-container">
      <div className="time-box">
        <span>{timeLeft.days}</span>
        <small>Days</small>
      </div>
      <div className="time-box">
        <span>{timeLeft.hours}</span>
        <small>Hours</small>
      </div>
      <div className="time-box">
        <span>{timeLeft.minutes}</span>
        <small>Minutes</small>
      </div>
      <div className="time-box">
        <span>{timeLeft.seconds}</span>
        <small>Seconds</small>
      </div>

      <div className="controls">
        <button onClick={handlePauseResume}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
