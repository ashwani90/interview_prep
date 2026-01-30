// In your component or action file
import { addNotification } from './notificationActions';

dispatch(addNotification({
  title: 'Success!',
  message: 'Your changes have been saved.',
  type: 'success', // Optional: 'success', 'error', 'warning', 'info'
  timeout: 3000    // Optional: Auto-dismiss after 3s (false for no auto-dismiss)
}));


// rootReducer.js
import { combineReducers } from 'redux';
import notifications from './notificationReducer';

export default combineReducers({
  notifications,
  // ...your other reducers
});// App.js
import ToastContainer from './ToastContainer';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ToastContainer />
    </div>
  );
}