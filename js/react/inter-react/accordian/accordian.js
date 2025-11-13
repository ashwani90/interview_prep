import React, { useState } from "react";
import AccordionItem from "./AccordionItem";
import "./Accordion.css";

export default function Accordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="accordion">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => toggleItem(idx)}
          title={item.title}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
