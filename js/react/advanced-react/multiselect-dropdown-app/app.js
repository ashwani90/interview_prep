// src/App.js
import React from 'react';
import MultiSelectDropdown from './components/MultiSelectDropdown';

const App = () => {
  // Simulate async loading
  const loadOptions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'React', 'Vue', 'Angular', 'Svelte', 'Next.js',
          'Node.js', 'Django', 'Flask', 'Laravel', 'Ruby on Rails',
        ]);
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Multiselect Dropdown with Tags</h1>
      <MultiSelectDropdown loadOptionsAsync={loadOptions} />
    </div>
  );
};

export default App;
