// src/components/MultiSelectDropdown.js
import React, { useEffect, useRef, useState } from 'react';
import Tag from './Tag';

const MultiSelectDropdown = ({ loadOptionsAsync }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();

  // Optional async loading
  useEffect(() => {
    if (loadOptionsAsync) {
      loadOptionsAsync().then(setOptions);
    } else {
      setOptions([
        'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Node.js', 'Django',
      ]);
    }
  }, [loadOptionsAsync]);

  const handleSelect = (value) => {
    if (!selected.includes(value)) {
      setSelected([...selected, value]);
    }
    setInputValue('');
    setShowDropdown(false);
  };

  const handleRemove = (value) => {
    setSelected(selected.filter((item) => item !== value));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && selected.length > 0) {
      setSelected(selected.slice(0, -1));
    }
  };

  const filteredOptions = options.filter(
    (opt) => opt.toLowerCase().includes(inputValue.toLowerCase()) && !selected.includes(opt)
  );

  return (
    <div className="relative w-full max-w-md">
      <div
        className="flex flex-wrap items-center border p-2 rounded cursor-text min-h-[42px]"
        onClick={() => inputRef.current.focus()}
      >
        {selected.map((item) => (
          <Tag key={item} label={item} onRemove={() => handleRemove(item)} />
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 min-w-[80px] outline-none"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 w-full rounded shadow max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
