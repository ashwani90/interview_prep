// layouts/DefaultLayout.js
import Head from 'next/head';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="Welcome to our application" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">My App</h1>
              </div>
              <nav className="flex space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600">© 2024 My App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}