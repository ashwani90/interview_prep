import React from "react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationDemo() {
  const { addNotification } = useNotifications();

  return (
    <div>
      <h2>Notification System Demo</h2>
      <button onClick={() => addNotification("This is an info message!")}>
        Show Info
      </button>
      <button onClick={() => addNotification("Success! Operation completed.", "success")}>
        Show Success
      </button>
      <button onClick={() => addNotification("Warning! Check your input.", "warning")}>
        Show Warning
      </button>
      <button onClick={() => addNotification("Error! Something went wrong.", "error")}>
        Show Error
      </button>
    </div>
  );
}
