import React from 'react';
import TextField from './TextField';

const EmailField = ({ schema, value, onChange, error }) => {
  return (
    <TextField
      schema={schema}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default EmailField;