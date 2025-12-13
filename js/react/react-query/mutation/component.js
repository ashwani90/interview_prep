// FileUpload.js
import React, { useState } from 'react';
import useFileUpload from './useFileUpload';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const { mutate, isPending, isSuccess, isError } = useFileUpload(
    (data) => {
      console.log('Upload successful:', data);
      setProgress(0);
      setFile(null);
    },
    (error) => {
      console.error('Upload failed:', error);
    }
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      mutate(file);
    }
  };

  // ... rest of the component remains the same
};

export default FileUpload;