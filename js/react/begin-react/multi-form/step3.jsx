import React from "react";
import { useFormContext } from "../../context/FormContext";

export default function Step3({ prev }) {
  const { formData } = useFormContext();

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h2>Step 3: Review & Submit</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <div className="nav-buttons">
        <button onClick={prev}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
