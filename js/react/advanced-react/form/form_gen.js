import React from 'react';
import TextField from './fields/TextField';
import EmailField from './fields/EmailField';
import CheckboxField from './fields/CheckboxField';
import ArrayField from './fields/ArrayField';
import ObjectField from './fields/ObjectField';
import { validateField } from '../../utils/validation';

const fieldComponents = {
  string: (schema) => {
    if (schema.format === 'email') return EmailField;
    return TextField;
  },
  number: TextField,
  boolean: CheckboxField,
  array: ArrayField,
  object: ObjectField
};

const FormGenerator = ({ schema, formData = {}, onChange, errors = {} }) => {
  const handleFieldChange = (fieldName, value) => {
    onChange({
      ...formData,
      [fieldName]: value
    });
  };

  const renderField = (fieldName, fieldSchema) => {
    const FieldComponent = fieldComponents[fieldSchema.type](fieldSchema);
    return (
      <FieldComponent
        key={fieldName}
        schema={fieldSchema}
        value={formData[fieldName]}
        onChange={(value) => handleFieldChange(fieldName, value)}
        error={errors[fieldName]}
      />
    );
  };

  return (
    <div className="form-generator">
      {schema.title && <h2>{schema.title}</h2>}
      {schema.description && <p>{schema.description}</p>}
      
      {Object.entries(schema.properties || {}).map(([fieldName, fieldSchema]) => (
        renderField(fieldName, fieldSchema)
      ))}
    </div>
  );
};

export default FormGenerator;