import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul aria-label="user-list">
        {users.map((user) => (
          <li key={user.id} role="listitem">{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
