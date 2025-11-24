import React from "react";
import Tabs from "./components/Tabs/Tabs";

export default function App() {
  const tabsData = [
    { label: "Home", content: <p>Welcome to the Home tab!</p> },
    { label: "Profile", content: <p>This is your Profile tab.</p> },
    { label: "Settings", content: <p>Adjust your Settings here.</p> },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Accessible Tabs</h1>
      <Tabs tabs={tabsData} />
    </div>
  );
}
