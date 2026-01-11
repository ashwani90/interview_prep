export const updateFormData = (step, data) => ({
    type: 'UPDATE_FORM_DATA',
    payload: { step, data }
  });
  
  export const resetForm = () => ({
    type: 'RESET_FORM'
  });
  
  export const setCurrentStep = (step) => ({
    type: 'SET_CURRENT_STEP',
    payload: step
  });