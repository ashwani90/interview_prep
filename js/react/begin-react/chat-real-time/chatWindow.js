import React, { useCallback, useEffect, useRef, useState } from "react";
import useMockSocket from "../hooks/useMockSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // onMessage will be invoked by the mock socket (incoming or our sends)
  const onMessage = useCallback((msg) => {
    // collapse ack messages into previous if needed (simple approach)
    setMessages((prev) => {
      // if it's an ack for a sent message append it but mark sent
      if (msg.status === "sent" && msg.id.endsWith("-ack")) {
        // find original id without -ack
        const origId = msg.id.replace(/-ack$/, "");
        // mark the original message as sent (simple strategy: append ack)
        return prev.map((m) => (m.id === origId ? { ...m, status: "sent" } : m));
      }

      return [...prev, msg];
    });
  }, []);

  // initialize mock socket
  const { send, close } = useMockSocket(onMessage, { incomingInterval: 5000 });

  useEffect(() => {
    return () => close();
  }, [close]);

  // send handler from input
  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    const payload = { sender: "You", text: text.trim() };
    send(payload);
  };

  return (
    <div className="chat-window" role="region" aria-label="Chat window">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
