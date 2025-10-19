import React from "react";
import UserList from "../components/UserList";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Custom Hook: useFetch</h1>
      <UserList />
    </div>
  );
}
