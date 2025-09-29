// src/components/AutoSaveForm.js
import React, { useState } from 'react';
import useAutosave from './useAutosave';

const AutoSaveForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { save, lastSaved } = useAutosave({ formData, setFormData }, 5000); // 5 seconds

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    save();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-semibold">Autosave Form</h2>

      <label className="block">
        <span>Name:</span>
        <input
          className="w-full border p-2 mt-1"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>

      <label className="block">
        <span>Email:</span>
        <input
          className="w-full border p-2 mt-1"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>

      <label className="block">
        <span>Message:</span>
        <textarea
          className="w-full border p-2 mt-1"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>

      {lastSaved && (
        <div className="text-sm text-gray-600">
          Last saved: {new Date(lastSaved).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default AutoSaveForm;
