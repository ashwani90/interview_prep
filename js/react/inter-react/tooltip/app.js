import React from "react";
import Tooltip from "./components/Tooltip/Tooltip";

export default function App() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Tooltip content="This is a top tooltip" position="top">
        <button>Hover me (Top)</button>
      </Tooltip>

      <br /><br />

      <Tooltip content="This is a bottom tooltip" position="bottom">
        <button>Hover me (Bottom)</button>
      </Tooltip>

      <br /><br />

      <Tooltip content="This is a left tooltip" position="left">
        <button>Hover me (Left)</button>
      </Tooltip>

      <br /><br />

      <Tooltip content="This is a right tooltip" position="right">
        <button>Hover me (Right)</button>
      </Tooltip>
    </div>
  );
}
