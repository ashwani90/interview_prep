import React, { useState } from 'react';
import FormGenerator from './FormGenerator';
import { validateForm } from '../../utils/validation';
import './FormGenerator.css';

const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(schema, formData);
    setErrors(validationErrors);
    
    if (isValid) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="dynamic-form">
      <form onSubmit={handleSubmit}>
        <FormGenerator
          schema={schema}
          formData={formData}
          onChange={setFormData}
          errors={errors}
        />
        
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => console.log(JSON.stringify(formData, null, 2))}>
            Export as JSON
          </button>
        </div>
      </form>

      {isSubmitted && (
        <div className="form-success">
          <h3>Form submitted successfully!</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;