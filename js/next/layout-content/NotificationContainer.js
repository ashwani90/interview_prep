// components/NotificationContainer.js
'use client';

import { useApp } from '../contexts/AppContext';

export function NotificationContainer() {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 ${
            notification.type === 'error'
              ? 'bg-red-100 border-red-500 text-red-700'
              : notification.type === 'warning'
              ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
              : 'bg-green-100 border-green-500 text-green-700'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}