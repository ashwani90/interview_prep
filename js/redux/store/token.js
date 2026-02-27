// tokenMiddleware.js
import { refreshToken } from './authActions';

export const tokenMiddleware = store => next => action => {
  // Skip non-API actions
  if (!action.type.includes('API_')) {
    return next(action);
  }

  const { dispatch, getState } = store;
  const { accessToken, refreshToken } = getState().auth;

  // Add token to request if available
  if (accessToken && action.payload) {
    action.payload.headers = {
      ...action.payload.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  // Check if token is expired (simplified example)
  const isExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  };

  // Handle expired token
  if (action.type === 'API_REQUEST' && isExpired(accessToken)) {
    if (!refreshToken) {
      dispatch(logout());
      return Promise.reject('No refresh token available');
    }

    return dispatch(refreshToken()).then(newToken => {
      // Retry original request with new token
      const retryAction = {
        ...action,
        payload: {
          ...action.payload,
          headers: {
            ...action.payload.headers,
            Authorization: `Bearer ${newToken}`
          }
        }
      };
      return next(retryAction);
    });
  }

  return next(action);
};