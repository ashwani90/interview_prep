// src/components/ExportButton.js
import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const ExportButton = ({ markdown }) => {
  const handleExport = () => {
    const html = DOMPurify.sanitize(marked(markdown));
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-export.html';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow"
    >
      Export HTML
    </button>
  );
};

export default ExportButton;
