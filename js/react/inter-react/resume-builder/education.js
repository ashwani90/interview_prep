import React from 'react';

const Education = ({ education, onChange }) => {
  const handleChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    onChange(newEducation);
  };

  const addEducation = () => {
    onChange([
      ...education,
      {
        institution: '',
        degree: '',
        year: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    onChange(newEducation);
  };

  return (
    <div className="form-section">
      <h3>Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="education-form">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) =>
                handleChange(index, 'institution', e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
            />
          </div>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeEducation(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="add-btn">
        Add Education
      </button>
    </div>
  );
};

export default Education;