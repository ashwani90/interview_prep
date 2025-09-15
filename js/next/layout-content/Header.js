// components/Header.js
'use client';

import { useUser } from '../hooks/useUser';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../contexts/AppContext';

export function Header() {
  const { user, isAuthenticated, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar, sidebarOpen } = useApp();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            My App
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* User menu */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hello, {user?.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
}