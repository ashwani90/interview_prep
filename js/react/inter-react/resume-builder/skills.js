import React from 'react';

const Skills = ({ skills, onChange }) => {
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    onChange(newSkills);
  };

  const addSkill = () => {
    onChange([...skills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(newSkills);
  };

  return (
    <div className="form-section">
      <h3>Skills</h3>
      {skills.map((skill, index) => (
        <div key={index} className="form-group skill-item">
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <button 
            type="button" 
            className="remove-btn"
            onClick={() => removeSkill(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addSkill} className="add-btn">
        Add Skill
      </button>
    </div>
  );
};

export default Skills;