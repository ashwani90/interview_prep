import React, { useState, useRef } from "react";
import "./FileUpload.css";

export default function FileUpload({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const dropRef = useRef();

  const maxFileSize = 5 * 1024 * 1024; // 5 MB
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleFiles = (selectedFiles) => {
    const validFiles = [];
    for (let file of selectedFiles) {
      if (file.size > maxFileSize) {
        alert(`${file.name} is too large! Max size is 5MB`);
        continue;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not an allowed file type`);
        continue;
      }
      validFiles.push(file);
    }
    setFiles((prev) => [...prev, ...validFiles]);
    onFilesSelected(validFiles);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("drag-over");
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.add("drag-over");
  };

  const onDragLeave = () => {
    dropRef.current.classList.remove("drag-over");
  };

  const onFileSelect = (e) => {
    handleFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <div
        ref={dropRef}
        className="drop-zone"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <p>Drag & Drop files here or click to upload</p>
        <input
          type="file"
          multiple
          onChange={onFileSelect}
          accept={allowedTypes.join(",")}
        />
      </div>

      {files.length > 0 && (
        <div className="preview-container">
          {files.map((file, idx) => (
            <div key={idx} className="preview-item">
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <p>{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
