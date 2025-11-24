import React, { useState } from "react";
import ToggleSwitch from "./components/ToggleSwitch/ToggleSwitch";

export default function App() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <h2>Custom Toggle Switch (demo)</h2>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ToggleSwitch
          checked={isOn}
          onToggle={(val) => {
            console.log("toggled ->", val);
            setIsOn(val);
          }}
          ariaLabel="Demo toggle"
        />
        <div>
          State: <strong>{isOn ? "ON" : "OFF"}</strong>
        </div>
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h3>Uncontrolled example</h3>
      <p>
        If you omit the <code>checked</code> prop, component will handle its own state.
      </p>
      <ToggleSwitch onToggle={(val) => console.log("uncontrolled toggled:", val)} />
    </div>
  );
}
