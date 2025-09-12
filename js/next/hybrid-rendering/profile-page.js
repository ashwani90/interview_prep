// app/(csr)/profile/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserData();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>This page uses client-side rendering.</p>
      
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          {/* More user data */}
        </div>
      )}
    </div>
  );
}

// No data fetching in server component - pure CSR
export const dynamic = 'force-static';