// ToastContainer.js
import React from 'react';
import { connect } from 'react-redux';
import { removeNotification } from './notificationActions';

const Toast = ({ notification, onDismiss }) => (
  <div className={`toast ${notification.type || 'info'}`}>
    <div className="toast-content">
      {notification.title && <h4>{notification.title}</h4>}
      <p>{notification.message}</p>
    </div>
    <button onClick={onDismiss} className="toast-close">
      &times;
    </button>
  </div>
);

const ToastContainer = ({ notifications, removeNotification }) => (
  <div className="toast-container">
    {notifications.active.map(notification => (
      <Toast
        key={notification.id}
        notification={notification}
        onDismiss={() => removeNotification(notification.id)}
      />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  notifications: state.notifications
});

export default connect(mapStateToProps, { removeNotification })(ToastContainer);