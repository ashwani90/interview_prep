import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

/**
 * MessageList
 * - auto-scrolls to newest message
 */
export default function MessageList({ messages = [] }) {
  const listRef = useRef(null);
  const bottomRef = useRef(null);

  // auto-scroll when messages change
  useEffect(() => {
    if (!bottomRef.current) return;
    // scroll smoothly to the bottom element
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="message-list" ref={listRef} role="log" aria-live="polite">
      {messages.length === 0 ? (
        <div className="empty">No messages yet. Say hello 👋</div>
      ) : (
        messages.map((m) => <MessageItem key={m.id} message={m} />)
      )}
      <div ref={bottomRef} />
    </div>
  );
}
