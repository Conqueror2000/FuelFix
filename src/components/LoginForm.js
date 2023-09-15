import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate

import '../styles/LoginForm.css';
import '../styles/CommonFormStyles.css';

export let NameOfUser = "User's";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'Employee',
  });

  const [userList, setUserList] = useState([]);
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the list of users (employees or technicians) based on the selected userType
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7068/api/${formData.userType}Info`

          // https://localhost:7068/api/EmployeeInfo ->all employee list
          //https://localhost:7068/api/TechnicianInfo -> all technician list
        );
        setUserList(response.data);
      } catch (error) {
        console.error('Fetch Users Error:', error);
      }
    };

    fetchUsers();
  }, [formData.userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user has entered all required fields
    const isValid = validateForm();

    if (isValid) {
      // Check if the provided username and password match any user in the user list
      const user = userList.find(
        (u) => u.email === formData.username && u.password === formData.password
        // formData.userType === 'Employee'
        //   ? u.employeeId === formData.username &&
        //     u.password === formData.password
        //   : u.technicianId === formData.username &&
        //     u.password === formData.password
      );

      if (user) {
        if (formData.userType === 'Employee') {
          NameOfUser = user.name + "'s";
          navigate('/employee'); // Use navigate instead of history.push
        } else if (formData.userType === 'Technician') {
          NameOfUser = user.name + "'s";
          navigate('/technician'); // Use navigate instead of history.push
        }
      } else {
        alert('Login failed: Invalid username or password');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form form-group'>
      <div className='form-group'>
        <label htmlFor='username'>Email</label>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='form-control'
        />
        <div className='text-danger'>{formErrors.username}</div>
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='form-control'
        />
        <div className='text-danger'>{formErrors.password}</div>
      </div>
      <div className='user-type'>
        <label className='radio-label'>
          <input
            type='radio'
            name='userType'
            value='Employee'
            checked={formData.userType === 'Employee'}
            onChange={handleChange}
          />
          Employee
        </label>
        <label className='radio-label'>
          <input
            type='radio'
            name='userType'
            value='Technician'
            checked={formData.userType === 'Technician'}
            onChange={handleChange}
          />
          Technician
        </label>
      </div>
      <button
        type='submit'
        className='login-button btn btn-primary'
        style={{ marginTop: '10px' }}>
        Login
      </button>

      <div style={{ marginTop: '10px' }}>
        Only Admin Can
        <span className='register-text' onClick={() => navigate('/register')}>
          Register!
        </span>{' '}
      </div>
    </form>
  );
};

export default LoginForm;
