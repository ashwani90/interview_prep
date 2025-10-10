// src/components/MarkdownEditor.js
import React from 'react';

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  return (
    <textarea
      className="w-full h-full p-4 border border-gray-300 resize-none"
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      placeholder="Type markdown here..."
    />
  );
};

export default MarkdownEditor;
