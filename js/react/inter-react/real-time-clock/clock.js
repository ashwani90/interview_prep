import React, { useEffect, useState } from "react";

export default function Clock({ timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
    hour12: false
  }).format(time);

  return (
    <div style={{ fontSize: "2rem", fontFamily: "monospace" }}>
      {formattedTime}
    </div>
  );
}
