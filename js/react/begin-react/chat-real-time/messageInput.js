import React, { useRef, useState } from "react";

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const submit = (e) => {
    e && e.preventDefault();
    const txt = value.trim();
    if (!txt) return;
    onSend(txt);
    setValue("");
    inputRef.current && inputRef.current.focus();
  };

  return (
    <form className="message-input" onSubmit={submit} role="form" aria-label="Send message">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message and press Enter..."
        aria-label="Message text"
      />
      <button type="submit" aria-label="Send message">Send</button>
    </form>
  );
}
