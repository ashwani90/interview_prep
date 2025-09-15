// components/Sidebar.js
'use client';

import { useApp } from '../contexts/AppContext';

export function Sidebar() {
  const { sidebarOpen } = useApp();

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Navigation
        </h2>
        
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="block px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile" className="block px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings" className="block px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}