export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadNotifications = (state) => 
  state.notifications.notifications.filter(n => !n.read);
export const selectUnreadCount = (state) => state.notifications.unreadCount;