// hooks/useImageValidation.js
import { useState, useEffect } from 'react';
import { isValidImageDomain } from '../lib/image-validation';

export const useImageValidation = (src) => {
  const [validation, setValidation] = useState({
    isValid: false,
    isLoading: true,
    reason: 'Checking...'
  });

  useEffect(() => {
    const validateImage = async () => {
      try {
        const result = isValidImageDomain(src);
        setValidation({
          isValid: result.isValid,
          isLoading: false,
          reason: result.reason,
          domain: result.domain
        });
      } catch (error) {
        setValidation({
          isValid: false,
          isLoading: false,
          reason: 'Validation error',
          error: error.message
        });
      }
    };

    validateImage();
  }, [src]);

  return validation;
};