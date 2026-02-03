const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          error: null
        };
      case 'LOGOUT':
        return initialState;
      // other cases
      default:
        return state;
    }
  };
  
  export default authReducer;