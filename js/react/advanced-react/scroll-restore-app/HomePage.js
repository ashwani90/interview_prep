// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <Link to="/about" className="text-blue-500 underline">Go to About</Link>

      <div className="mt-8 space-y-8">
        {[...Array(50)].map((_, i) => (
          <p key={i}>This is paragraph #{i + 1}</p>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
