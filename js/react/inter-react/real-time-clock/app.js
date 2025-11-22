import React, { useState } from "react";
import Clock from "./components/Clock";
import TimezoneSelector from "./components/TimezoneSelector";

export default function App() {
  const [timezone, setTimezone] = useState("UTC");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Real-Time Clock</h1>
      <Clock timezone={timezone} />
      <div style={{ marginTop: "20px" }}>
        <label>
          Select Timezone:{" "}
          <TimezoneSelector timezone={timezone} onChange={setTimezone} />
        </label>
      </div>
    </div>
  );
}
