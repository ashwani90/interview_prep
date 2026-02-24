// authActions.js
import api from './apiClient';

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  
  try {
    const response = await api.post('/auth/login', credentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      }
    });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    throw error;
  }
};

export const refreshToken = () => async (dispatch, getState) => {
  const { refreshToken } = getState().auth;
  if (!refreshToken) return;

  dispatch({ type: 'REFRESH_TOKEN_REQUEST' });
  
  try {
    const response = await api.post('/auth/refresh', { refreshToken });
    dispatch({
      type: 'REFRESH_TOKEN_SUCCESS',
      payload: {
        accessToken: response.data.accessToken
      }
    });
    return response.data.accessToken;
  } catch (error) {
    dispatch({ type: 'REFRESH_TOKEN_FAILURE', payload: error.message });
    dispatch(logout());
    throw error;
  }
};

export const logout = () => ({ type: 'LOGOUT' });