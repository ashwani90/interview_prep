import React from 'react';

const PasswordSuggestions = ({ suggestions }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="suggestions">
      <p>To improve your password:</p>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordSuggestions;