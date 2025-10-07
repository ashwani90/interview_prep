import React from 'react';
import FormGenerator from '../FormGenerator';

const ObjectField = ({ schema, value = {}, onChange }) => {
  const { title, properties } = schema;

  return (
    <div className="form-field object-field">
      <h3>{title}</h3>
      <FormGenerator
        schema={{ properties }}
        formData={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ObjectField;