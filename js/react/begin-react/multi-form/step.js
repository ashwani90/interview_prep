import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";

export default function Step1({ next }) {
  const { formData, updateFormData } = useFormContext();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.name || !formData.email) {
      setError("Name and Email are required");
      return;
    }
    next();
  };

  return (
    <div>
      <h2>Step 1: Personal Info</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
