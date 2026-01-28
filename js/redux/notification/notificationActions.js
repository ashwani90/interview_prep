// notificationActions.js
let nextToastId = 0;

export const addNotification = (notification) => (dispatch) => {
  const id = ++nextToastId;
  const payload = {
    id,
    ...notification,
    timeout: notification.timeout || null
  };

  dispatch({
    type: 'ADD_NOTIFICATION',
    payload
  });

  // Auto-dismiss if timeout is set
  if (payload.timeout !== null) {
    const timeout = payload.timeout !== undefined 
      ? payload.timeout 
      : 5000; // Default 5 seconds
    
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, timeout);
  }
};

export const removeNotification = (id) => (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_NOTIFICATION',
    payload: id
  });
  
  // Check if we need to show queued notifications
  const { queue, active } = getState().notifications;
  if (queue.length > active.length) {
    dispatch({ type: 'UPDATE_ACTIVE_TOASTS' });
  }
};

// Optional: Action to manually trigger showing next queued toast
export const showNextNotification = () => ({ type: 'UPDATE_ACTIVE_TOASTS' });