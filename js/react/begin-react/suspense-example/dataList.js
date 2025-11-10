import React from "react";

export default function DataList({ resource }) {
  const data = resource.read();

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
