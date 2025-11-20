import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import './styles/GitHubUser.css';

const UserSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter GitHub username"
      />
    </div>
  );
};

export default UserSearch;