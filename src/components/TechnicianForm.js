import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TechnicianForm.css';
import '../styles/CommonFormStyles.css';

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    TechnicianId: '',
    Password: '',
    Sector: '',
    TypeOfEquip: '',
    PhoneNo: '',
    Email: '',
    FirstName: '',
    LastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.TechnicianId || !formData.Password || !formData.Sector || !formData.TypeOfEquip || !formData.PhoneNo || !formData.Email || !formData.FirstName || !formData.LastName) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post('https://localhost:7068/api/TechnicianInfo', formData);
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="technician-form form-group">
      <label className="technician-label form-label">
        Technician ID:
        <input type="text" name="TechnicianId" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Password:
        <input type="password" name="Password" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Sector:
        <input type="text" name="Sector" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Type of Equipment:
        <input type="text" name="TypeOfEquip" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Phone Number:
        <input type="text" name="PhoneNo" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Email:
        <input type="email" name="Email" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        First Name:
        <input type="text" name="FirstName" onChange={handleChange} className="technician-input form-control" />
      </label>
      <label className="technician-label form-label">
        Last Name:
        <input type="text" name="LastName" onChange={handleChange} className="technician-input form-control" />
      </label>
      <button type="submit" className="technician-button btn btn-primary">Register</button>
    </form>
  );
};

export default TechnicianForm;
