// app/user/layout.js
import { Breadcrumbs } from '../../components/Breadcrumbs';

export default function UserLayout({ children, params }) {
  return (
    <div className="container mx-auto p-6">
      <Breadcrumbs />
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

// Breadcrumbs component
function Breadcrumbs({ params }) {
  // This would be implemented to show navigation based on current path
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <span>Home</span>
      <span className="mx-2">/</span>
      <span>User</span>
    </nav>
  );
}