const initialState = {
    currentStep: 1,
    formData: {
      step1: {},
      step2: {},
      step3: {}
    }
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_FORM_DATA':
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.step]: action.payload.data
          }
        };
      case 'SET_CURRENT_STEP':
        return {
          ...state,
          currentStep: action.payload
        };
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  };
  
  export default formReducer;