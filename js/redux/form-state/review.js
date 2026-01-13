import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm, setCurrentStep } from '../../store/actions/formActions';

const Review = () => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form.formData);
  
  const handleSubmit = () => {
    // Submit data to API or perform final action
    console.log('Form submitted:', formData);
    dispatch(resetForm());
    alert('Form submitted successfully!');
  };

  const handleBack = () => {
    dispatch(setCurrentStep(3));
  };

  return (
    <div className="review-container">
      <h2>Review Your Information</h2>
      
      <div className="review-section">
        <h3>Personal Information</h3>
        <p><strong>First Name:</strong> {formData.step1.firstName}</p>
        <p><strong>Last Name:</strong> {formData.step1.lastName}</p>
        <p><strong>Age:</strong> {formData.step1.age}</p>
      </div>
      
      <div className="review-section">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> {formData.step2.email}</p>
        <p><strong>Phone:</strong> {formData.step2.phone}</p>
        <p><strong>Address:</strong> {formData.step2.address}</p>
      </div>
      
      <div className="review-section">
        <h3>Preferences</h3>
        <p><strong>Newsletter:</strong> {formData.step3.newsletter ? 'Yes' : 'No'}</p>
        <p><strong>Notifications:</strong> {formData.step3.notifications}</p>
      </div>
      
      <div className="review-actions">
        <button type="button" onClick={handleBack}>Back</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Review;