// pages/admin/users.js
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminUsers() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Apply admin layout
AdminUsers.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};