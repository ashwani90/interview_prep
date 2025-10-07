import React from 'react';

const TextField = ({ schema, value, onChange, error }) => {
  const { title, type, required } = schema;

  return (
    <div className="form-field">
      <label>
        {title}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type === 'number' ? 'number' : 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextField;