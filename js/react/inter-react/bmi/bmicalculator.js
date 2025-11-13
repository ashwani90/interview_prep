import React, { useState } from "react";
import "./BMICalculator.css";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!height || !weight || height <= 0 || weight <= 0) {
      setError("Please enter valid height and weight.");
      setBmi(null);
      setCategory("");
      return;
    }

    setError("");
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue));
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 24.9) return "Normal weight";
    if (bmiValue < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 170"
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 65"
          />
        </div>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {bmi && (
        <div className="result">
          <p><strong>BMI:</strong> {bmi}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>
      )}
    </div>
  );
}
