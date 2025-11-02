import React from "react";
import { FormProvider } from "./context/FormContext";
import MultiStepForm from "./components/MultiStepForm";

export default function App() {
  return (
    <FormProvider>
      <div className="app">
        <h1>Multi-step Form Wizard</h1>
        <MultiStepForm />
      </div>
    </FormProvider>
  );
}
