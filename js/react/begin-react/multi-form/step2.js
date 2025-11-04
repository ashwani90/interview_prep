import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";

export default function Step2({ next, prev }) {
  const { formData, updateFormData } = useFormContext();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.age || !formData.address) {
      setError("Age and Address are required");
      return;
    }
    next();
  };

  return (
    <div>
      <h2>Step 2: Additional Info</h2>
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => updateFormData({ age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => updateFormData({ address: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <div className="nav-buttons">
        <button onClick={prev}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
