import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0
  },
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead(state, action) {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    }
  }
});

export const { addNotification, markAsRead, clearNotifications } = notificationsSlice.actions;

// Thunk action for delayed notification
export const showTemporaryNotification = (message, duration = 5000) => (dispatch) => {
  const id = Date.now();
  dispatch(addNotification({ id, message, read: false }));
  
  setTimeout(() => {
    dispatch(markAsRead(id));
  }, duration);
};

export default notificationsSlice.reducer;