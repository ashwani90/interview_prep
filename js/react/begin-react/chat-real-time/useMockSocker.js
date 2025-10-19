import { useEffect, useRef, useCallback } from "react";

/**
 * Minimal mock socket hook
 * - onMessage callback is called for each "incoming" message
 * - send(msg) simulates sending a message to server (echo back)
 * - close() stops the mock socket
 */
export default function useMockSocket(onMessage, options = {}) {
  const intervalRef = useRef(null);
  const counterRef = useRef(0);

  // start the mock socket
  useEffect(() => {
    // simulate server pushing messages every 4-7 seconds
    intervalRef.current = setInterval(() => {
      counterRef.current += 1;
      const incoming = {
        id: `srv-${Date.now()}-${counterRef.current}`,
        sender: "Server",
        text: randomIncomingText(),
        ts: new Date().toISOString(),
      };
      onMessage(incoming);
    }, options.incomingInterval || 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = useCallback(
    (msg) => {
      // simulate slight delay and server echo/acknowledge
      const clientSent = {
        id: `me-${Date.now()}`,
        sender: msg.sender || "Me",
        text: msg.text,
        ts: new Date().toISOString(),
        status: "sending",
      };
      onMessage(clientSent);

      // server acknowledges after a short delay
      setTimeout(() => {
        const ack = {
          ...clientSent,
          id: `${clientSent.id}-ack`,
          status: "sent",
        };
        onMessage(ack);
      }, 300);
    },
    [onMessage]
  );

  const close = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  return { send, close };
}

// helper to make varied incoming messages
function randomIncomingText() {
  const samples = [
    "Hello! How's it going?",
    "Did you see the game last night?",
    "Reminder: standup at 10 AM",
    "That's awesome 🎉",
    "I'll get back to you on that.",
    "Have you tried the new cafe downtown?",
    "Ping me when you're free",
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}
