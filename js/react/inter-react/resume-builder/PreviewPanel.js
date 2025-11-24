import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './styles/PreviewPanel.css';

const PreviewPanel = ({ resumeData }) => {
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2>Resume Preview</h2>
        <button onClick={handleDownloadPDF} className="download-btn">
          Download PDF
        </button>
      </div>
      <div className="resume" ref={resumeRef}>
        <div className="resume-header">
          <h1>{resumeData.personalInfo.name}</h1>
          <div className="contact-info">
            <p>{resumeData.personalInfo.email}</p>
            <p>{resumeData.personalInfo.phone}</p>
            <p>{resumeData.personalInfo.address}</p>
          </div>
        </div>

        <div className="resume-section">
          <h2>Skills</h2>
          <ul>
            {resumeData.skills.map((skill, index) => (
              skill && <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.institution}</h3>
              <p>{edu.degree} - {edu.year}</p>
            </div>
          ))}
        </div>

        <div className="resume-section">
          <h2>Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.company}</h3>
              <p>{exp.position} | {exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;