import React from 'react';
import PersonalInfo from './PersonalInfo';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import './styles/EditorPanel.css';

const EditorPanel = ({ resumeData, updateResumeData }) => {
  return (
    <div className="editor-panel">
      <h2>Edit Your Resume</h2>
      <PersonalInfo 
        data={resumeData.personalInfo} 
        onChange={(data) => updateResumeData('personalInfo', data)} 
      />
      <Skills 
        skills={resumeData.skills} 
        onChange={(data) => updateResumeData('skills', data)} 
      />
      <Education 
        education={resumeData.education} 
        onChange={(data) => updateResumeData('education', data)} 
      />
      <Experience 
        experience={resumeData.experience} 
        onChange={(data) => updateResumeData('experience', data)} 
      />
    </div>
  );
};

export default EditorPanel;