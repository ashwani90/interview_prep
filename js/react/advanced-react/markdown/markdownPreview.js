// src/components/MarkdownPreview.js
import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import 'highlight.js/styles/github.css';

marked.setOptions({
  breaks: true,
  highlight: (code, lang) => {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

const MarkdownPreview = ({ markdown }) => {
  const previewRef = useRef();

  useEffect(() => {
    previewRef.current.innerHTML = DOMPurify.sanitize(marked(markdown));
  }, [markdown]);

  return (
    <div
      ref={previewRef}
      className="prose prose-sm max-w-full p-4 border border-gray-300 overflow-auto"
    />
  );
};

export default MarkdownPreview;
