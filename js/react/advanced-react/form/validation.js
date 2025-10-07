export const validateField = (schema, value) => {
    if (schema.required && (value === undefined || value === '' || value === null)) {
      return 'This field is required';
    }
  
    if (schema.type === 'string') {
      if (schema.minLength && value?.length < schema.minLength) {
        return `Must be at least ${schema.minLength} characters`;
      }
      if (schema.maxLength && value?.length > schema.maxLength) {
        return `Must be at most ${schema.maxLength} characters`;
      }
      if (schema.pattern && value && !new RegExp(schema.pattern).test(value)) {
        return 'Invalid format';
      }
      if (schema.format === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email address';
      }
    }
  
    if (schema.type === 'number') {
      if (schema.minimum && value < schema.minimum) {
        return `Must be at least ${schema.minimum}`;
      }
      if (schema.maximum && value > schema.maximum) {
        return `Must be at most ${schema.maximum}`;
      }
    }
  
    return null;
  };
  
  export const validateForm = (schema, formData) => {
    const errors = {};
    let isValid = true;
  
    Object.entries(schema.properties || {}).forEach(([fieldName, fieldSchema]) => {
      const error = validateField(fieldSchema, formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
  
      // Validate nested objects
      if (fieldSchema.type === 'object' && formData[fieldName]) {
        const nestedErrors = validateForm(fieldSchema, formData[fieldName]);
        if (Object.keys(nestedErrors).length > 0) {
          errors[fieldName] = nestedErrors;
          isValid = false;
        }
      }
    });
  
    return { isValid, errors };
  };