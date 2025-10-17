// src/pages/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>
      <Link to="/" className="text-blue-500 underline">Go back to Home</Link>

      <div className="mt-8 space-y-8">
        {[...Array(20)].map((_, i) => (
          <p key={i}>About content paragraph #{i + 1}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
