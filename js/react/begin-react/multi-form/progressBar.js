import React from "react";
import { useFormContext } from "../context/FormContext";

export default function ProgressBar() {
  const { step } = useFormContext();
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
