import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  notifications: notificationsReducer
});

export default rootReducer;