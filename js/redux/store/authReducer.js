// authReducer.js
const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    lastRefreshed: null
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'REFRESH_TOKEN_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null
        };
  
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          lastRefreshed: Date.now()
        };
  
      case 'REFRESH_TOKEN_SUCCESS':
        return {
          ...state,
          accessToken: action.payload.accessToken,
          isLoading: false,
          lastRefreshed: Date.now()
        };
  
      case 'LOGIN_FAILURE':
      case 'REFRESH_TOKEN_FAILURE':
        return {
          ...state,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: action.payload
        };
  
      case 'LOGOUT':
        return initialState;
  
      default:
        return state;
    }
  }