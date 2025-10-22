import React from "react";
import { useStore } from "../store/useStore";

export default function UserProfile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = () => {
    setUser({ name: "Alice", email: "alice@example.com" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
