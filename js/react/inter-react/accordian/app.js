import React from "react";
import Accordion from "./components/Accordion/Accordion";

export default function App() {
  const faqItems = [
    { title: "What is React?", content: "React is a JavaScript library for building UI." },
    { title: "What is a component?", content: "A component is a reusable piece of UI." },
    { title: "What is state?", content: "State is data managed within a component." },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>FAQ</h1>
      <Accordion items={faqItems} allowMultiple={false} />
    </div>
  );
}
