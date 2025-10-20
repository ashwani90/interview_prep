import React from "react";
import CustomSelect from "../components/CustomSelect";

export default function Home() {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  function handleChange(option) {
    console.log("Selected:", option);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Custom Accessible Dropdown</h1>
      <CustomSelect
        options={options}
        onChange={handleChange}
        placeholder="Pick a framework"
      />
    </div>
  );
}
