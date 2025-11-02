import React from "react";
import { useFormContext } from "../context/FormContext";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import ProgressBar from "./ProgressBar";

export default function MultiStepForm() {
  const { step, setStep } = useFormContext();

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className="form-container">
      <ProgressBar />
      {step === 1 && <Step1 next={next} />}
      {step === 2 && <Step2 next={next} prev={prev} />}
      {step === 3 && <Step3 prev={prev} />}
    </div>
  );
}
