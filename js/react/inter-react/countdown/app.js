import React from "react";
import CountdownTimer from "./components/CountdownTimer";

export default function App() {
  const futureDate = new Date();
  futureDate.setMinutes(futureDate.getMinutes() + 1); // 1 min from now

  return (
    <div style={{ padding: "20px" }}>
      <h1>Countdown Timer</h1>
      <CountdownTimer targetDate={futureDate} />
    </div>
  );
}
