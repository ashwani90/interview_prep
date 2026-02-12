import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk action for async login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;