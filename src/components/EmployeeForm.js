import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EmployeeForm.css';
import '../styles/CommonFormStyles.css';


const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    designation: '',
    phoneNo: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.password || !formData.designation || !formData.phoneNo || !formData.email || !formData.firstName || !formData.lastName) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post('https://localhost:7068/api/EmployeeInfo', formData);
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form form-group">
      <label className="employee-label form-label">
        Employee ID:
        <input type="text" name="employeeId" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        password:
        <input type="password" name="password" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        designation:
        <input type="text" name="designation" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Phone Number:
        <input type="text" name="phoneNo" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        email:
        <input type="email" name="email" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        First Name:
        <input type="text" name="firstName" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Last Name:
        <input type="text" name="lastName" onChange={handleChange} className="employee-input form-control" />
      </label>
      <button type="submit" className="employee-button btn btn-primary">Register</button>
    </form>
  );
};

export default EmployeeForm;
