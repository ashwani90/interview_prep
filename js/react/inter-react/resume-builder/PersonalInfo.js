import React from 'react';

const PersonalInfo = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;