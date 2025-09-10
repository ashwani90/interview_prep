// app/(ssr)/dashboard/page.js
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getDashboardData(userId) {
  // This runs on every request
  const [recentActivity, notifications, stats] = await Promise.all([
    fetch(`https://api.example.com/users/${userId}/activity`, {
      cache: 'no-store' // Ensure fresh data
    }),
    fetch(`https://api.example.com/users/${userId}/notifications`, {
      cache: 'no-store'
    }),
    fetch(`https://api.example.com/users/${userId}/stats`, {
      cache: 'no-store'
    })
  ]);
  
  return {
    activity: await recentActivity.json(),
    notifications: await notifications.json(),
    stats: await stats.json()
  };
}

export default async function Dashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  const data = await getDashboardData(session.user.id);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This page is server-rendered on every request.</p>
      
      <div>
        <h2>Recent Activity</h2>
        {/* Render activity data */}
      </div>
      
      <div>
        <h2>Notifications</h2>
        {/* Render notifications */}
      </div>
    </div>
  );
}

// Force SSR - no static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Dashboard - SSR',
  description: 'User dashboard with real-time data',
};