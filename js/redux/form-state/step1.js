import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setCurrentStep } from '../../store/actions/formActions';

const Step1 = () => {
  const dispatch = useDispatch();
  const savedData = useSelector(state => state.form.formData.step1);
  
  const [formData, setFormData] = useState({
    firstName: savedData.firstName || '',
    lastName: savedData.lastName || '',
    age: savedData.age || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData('step1', formData));
    dispatch(setCurrentStep(2));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;