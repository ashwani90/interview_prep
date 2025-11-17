import React from "react";
import FileUpload from "./components/FileUpload";

export default function App() {
  const handleFilesSelected = (files) => {
    console.log("Uploaded files:", files);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>File Upload with Drag & Drop</h1>
      <FileUpload onFilesSelected={handleFilesSelected} />
    </div>
  );
}
