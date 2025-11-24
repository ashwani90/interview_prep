import React from 'react';

const Experience = ({ experience, onChange }) => {
  const handleChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    onChange(newExperience);
  };

  const addExperience = () => {
    onChange([
      ...experience,
      {
        company: '',
        position: '',
        duration: '',
        description: ''
      }
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    onChange(newExperience);
  };

  return (
    <div className="form-section">
      <h3>Experience</h3>
      {experience.map((exp, index) => (
        <div key={index} className="experience-form">
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) =>
                handleChange(index, 'company', e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) =>
                handleChange(index, 'position', e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              value={exp.duration}
              onChange={(e) =>
                handleChange(index, 'duration', e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleChange(index, 'description', e.target.value)
              }
            />
          </div>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeExperience(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperience} className="add-btn">
        Add Experience
      </button>
    </div>
  );
};

export default Experience;