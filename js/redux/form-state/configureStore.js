import { createStore, combineReducers } from 'redux';
import formReducer from './reducers/formReducer';

const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer);

export default store;