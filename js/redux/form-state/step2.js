import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setCurrentStep } from '../../store/actions/formActions';

const Step2 = () => {
  const dispatch = useDispatch();
  const savedData = useSelector(state => state.form.formData.step2);
  
  const [formData, setFormData] = useState({
    email: savedData.email || '',
    phone: savedData.phone || '',
    address: savedData.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData('step2', formData));
    dispatch(setCurrentStep(3));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(1));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Information</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="button" onClick={handleBack}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2;