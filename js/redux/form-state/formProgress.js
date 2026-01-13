import React from 'react';
import { useSelector } from 'react-redux';
import './FormProgress.css';

const FormProgress = () => {
  const currentStep = useSelector(state => state.form.currentStep);
  
  return (
    <div className="progress-container">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="step-number">1</div>
        <div className="step-label">Personal Info</div>
      </div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="step-number">2</div>
        <div className="step-label">Contact Info</div>
      </div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
        <div className="step-number">3</div>
        <div className="step-label">Preferences</div>
      </div>
      <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
        <div className="step-number">4</div>
        <div className="step-label">Review</div>
      </div>
    </div>
  );
};

export default FormProgress;