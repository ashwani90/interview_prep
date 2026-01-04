// featureFlagsReducer.js
const initialState = {
    flags: {},
    loading: false,
    error: null,
    lastUpdated: null
  };
  
  export default function featureFlagsReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_FLAGS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case 'FETCH_FLAGS_SUCCESS':
        return {
          ...state,
          loading: false,
          flags: action.payload,
          lastUpdated: Date.now()
        };
  
      case 'FETCH_FLAGS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      case 'SET_FLAG':
        return {
          ...state,
          flags: {
            ...state.flags,
            [action.payload.flag]: action.payload.value
          }
        };
  
      default:
        return state;
    }
  }