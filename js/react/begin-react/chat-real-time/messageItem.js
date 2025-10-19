import React from "react";

export default function MessageItem({ message }) {
  const isMe = (message.sender || "").toLowerCase().includes("you") || (message.sender || "").toLowerCase() === "me";
  const className = `message-item ${isMe ? "me" : "other"}`;

  return (
    <div className={className} aria-label={`message from ${message.sender}`}>
      <div className="message-bubble">
        <div className="message-text">{message.text}</div>
        <div className="message-meta">
          <small className="sender">{message.sender}</small>
          {message.status && <small className="status"> • {message.status}</small>}
        </div>
      </div>
    </div>
  );
}
