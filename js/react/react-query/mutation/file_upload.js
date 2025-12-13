import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    });

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log('Upload successful:', data);
      setProgress(0);
      setFile(null);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div>
      <h2>File Upload with Progress</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file || mutation.isPending}>
          {mutation.isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {mutation.isPending && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}

      {mutation.isSuccess && (
        <div style={{ color: 'green' }}>File uploaded successfully!</div>
      )}

      {mutation.isError && (
        <div style={{ color: 'red' }}>Error uploading file!</div>
      )}
    </div>
  );
};

export default FileUpload;