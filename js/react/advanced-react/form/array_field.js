import React from 'react';

const ArrayField = ({ schema, value = [], onChange }) => {
  const { title, items } = schema;

  const handleAddItem = () => {
    onChange([...value, '']);
  };

  const handleRemoveItem = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleItemChange = (index, itemValue) => {
    const newValue = [...value];
    newValue[index] = itemValue;
    onChange(newValue);
  };

  return (
    <div className="form-field array-field">
      <label>{title}</label>
      {value.map((item, index) => (
        <div key={index} className="array-item">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>
        Add {items.title}
      </button>
    </div>
  );
};

export default ArrayField;