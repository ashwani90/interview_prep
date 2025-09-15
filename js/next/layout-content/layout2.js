// app/(main)/layout.js
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { NotificationContainer } from '../../components/NotificationContainer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <NotificationContainer />
    </div>
  );
}