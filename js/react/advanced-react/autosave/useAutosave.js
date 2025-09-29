// src/components/useAutosave.js
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'autosave-form-data';

export default function useAutosave(formData, delay) {
  const [lastSaved, setLastSaved] = useState(null);

  // Restore data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed?.data) {
          formData.setFormData(parsed.data);
          setLastSaved(parsed.timestamp);
        }
      } catch (e) {
        console.error('Failed to parse saved form data');
      }
    }
  }, []);

  // Autosave every X seconds
  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, delay);

    return () => clearInterval(interval);
  });

  const save = () => {
    const now = new Date().toISOString();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: formData.formData,
        timestamp: now,
      })
    );
    setLastSaved(now);
  };

  return { save, lastSaved };
}
