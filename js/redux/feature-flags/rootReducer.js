// rootReducer.js
import { combineReducers } from 'redux';
import featureFlags from './featureFlagsReducer';

export default combineReducers({
  featureFlags,
  // ...your other reducers
});