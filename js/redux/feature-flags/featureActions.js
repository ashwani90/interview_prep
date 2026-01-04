// featureFlagsActions.js
export const fetchFlags = () => async (dispatch) => {
    dispatch({ type: 'FETCH_FLAGS_REQUEST' });
  
    try {
      const response = await fetch('/api/feature-flags');
      const flags = await response.json();
      
      dispatch({
        type: 'FETCH_FLAGS_SUCCESS',
        payload: flags
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_FLAGS_FAILURE',
        payload: error.message
      });
    }
  };
  
  export const setFlag = (flag, value) => ({
    type: 'SET_FLAG',
    payload: { flag, value }
  });