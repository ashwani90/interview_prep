import React, { useState } from 'react';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import './styles/App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    skills: [''],
    education: [
      {
        institution: '',
        degree: '',
        year: ''
      }
    ],
    experience: [
      {
        company: '',
        position: '',
        duration: '',
        description: ''
      }
    ]
  });

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="app-container">
      <EditorPanel 
        resumeData={resumeData} 
        updateResumeData={updateResumeData} 
      />
      <PreviewPanel resumeData={resumeData} />
    </div>
  );
}

export default App;