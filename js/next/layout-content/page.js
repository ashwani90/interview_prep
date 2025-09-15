// app/(main)/dashboard/page.js
'use client';

import { useApp } from '../../../contexts/AppContext';
import { useUser } from '../../../hooks/useUser';

export default function Dashboard() {
  const { user, isAuthenticated } = useUser();
  const { addNotification } = useApp();

  const handleTestNotification = () => {
    addNotification({
      type: 'success',
      title: 'Test Notification',
      message: 'This is a test notification from the dashboard!',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Please log in to view the dashboard</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Hello, {user?.name}. You're logged in and ready to go.
          </p>
        </div>

        {/* Stats card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your dashboard stats will appear here.
          </p>
        </div>

        {/* Actions card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <button
            onClick={handleTestNotification}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Test Notification
          </button>
        </div>
      </div>
    </div>
  );
}