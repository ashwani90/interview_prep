// components/UserProfile.js
'use client';

import { useParams } from 'next/navigation';

export function UserProfile() {
  const params = useParams();
  const slug = params.slug || [];
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Slug segments: {slug.join(' / ')}</p>
      
      {slug.length >= 1 && (
        <div>
          <h2>User ID: {slug[0]}</h2>
        </div>
      )}
      
      {slug.length >= 2 && (
        <div>
          <h3>Section: {slug[1]}</h3>
        </div>
      )}
      
      {slug.length >= 3 && (
        <div>
          <h4>Sub-section: {slug[2]}</h4>
        </div>
      )}
    </div>
  );
}