// components/LayoutWrapper.js
import { useRouter } from 'next/router';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';

export default function LayoutWrapper({ children }) {
  const router = useRouter();
  const { pathname } = router;

  // Check if route is admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Check if route is auth route
  const isAuthRoute = pathname.startsWith('/login') || 
                     pathname.startsWith('/register') || 
                     pathname.startsWith('/forgot-password');

  // Return appropriate layout based on route
  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (isAuthRoute) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}