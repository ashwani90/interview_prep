import React from 'react';

const CheckboxField = ({ schema, value, onChange }) => {
  const { title } = schema;

  return (
    <div className="form-field">
      <label>
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
        {title}
      </label>
    </div>
  );
};

export default CheckboxField;