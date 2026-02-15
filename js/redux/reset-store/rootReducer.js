// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import themeReducer from './themeReducer';
import languageReducer from './languageReducer';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
  language: languageReducer,
  // ...other reducers
});

const rootReducer = (state, action) => {
  // When a logout action is dispatched, reset the state
  if (action.type === 'USER_LOGOUT') {
    if (action.preservePreferences) {
      // Preserve theme and language state only
      const { theme, language } = state;
      return appReducer({ theme, language }, action);
    }
    // Otherwise reset completely
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;