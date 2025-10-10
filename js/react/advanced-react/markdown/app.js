// src/App.js
import React, { useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import ExportButton from './components/ExportButton';

const App = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Editor!

- Type Markdown on the left
- See live preview on the right

\`\`\`js
// Code blocks are highlighted
function hello() {
  console.log("Hello, world!");
}
\`\`\`
`);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Editor</h2>
        <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <MarkdownPreview markdown={markdown} />
        <ExportButton markdown={markdown} />
      </div>
    </div>
  );
};

export default App;
