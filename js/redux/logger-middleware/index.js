import { combineReducers } from 'redux';
import loggerReducer from './loggerReducer';
// import other reducers...

const rootReducer = combineReducers({
  logger: loggerReducer,
  // other reducers...
});

export default rootReducer;