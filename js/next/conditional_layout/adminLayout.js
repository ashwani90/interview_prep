// layouts/AdminLayout.js
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard" />
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        {/* Admin Sidebar */}
        <div className="flex">
          <div className="w-64 bg-white shadow-md min-h-screen">
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            
            <nav className="mt-4">
              <Link 
                href="/admin" 
                className={`block px-4 py-2 ${isActive('/admin')}`}
              >
                Dashboard
              </Link>
              
              <Link 
                href="/admin/users" 
                className={`block px-4 py-2 ${isActive('/admin/users')}`}
              >
                Users
              </Link>
              
              <Link 
                href="/admin/products" 
                className={`block px-4 py-2 ${isActive('/admin/products')}`}
              >
                Products
              </Link>
              
              <Link 
                href="/admin/settings" 
                className={`block px-4 py-2 ${isActive('/admin/settings')}`}
              >
                Settings
              </Link>
              
              <Link 
                href="/" 
                className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 mt-4 border-t"
              >
                ← Back to Site
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Admin Header */}
            <header className="bg-white shadow-sm">
              <div className="flex justify-between items-center h-16 px-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Admin Dashboard</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Admin User</span>
                  <button className="text-gray-600 hover:text-gray-900">Logout</button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}