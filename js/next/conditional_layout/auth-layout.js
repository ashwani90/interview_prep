// layouts/AuthLayout.js (Optional - for login pages)
import Head from 'next/head';

export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Login - My App</title>
        <meta name="description" content="Login to your account" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </div>
    </>
  );
}