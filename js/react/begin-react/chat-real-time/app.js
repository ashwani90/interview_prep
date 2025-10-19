import React from "react";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div className="app">
      <h1 className="app-title">Realtime Chat (Mock)</h1>
      <ChatWindow />
    </div>
  );
}
