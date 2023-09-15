// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import '../styles/TicketForm.css';

const TicketForm = () => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    EmployeeId: '',
    Sector: '',
    TypeOfEquip: '',
    Priority: 'Low', // Default priority value
    Comment: '',
  });

  // Define a mapping of sectors to their respective types of equipment
  const sectorEquipMapping = {
    Drilling: 'Drill Bits, Drill Pipe, Drill Collars',
    'Blowout Preventer Stack': 'Annular BOP, Control System',
    'Mud Systems': 'Mud Pumps, Mud Tank, Mud Mixers',
    'Rotatory Equipments': 'Drawworks, Rotatory Tables',
    'Casing and tubing': 'Casing, Tubing, Connections',
    'Well Head': 'Valves And Chokes, Wellhead Seals',
    'Pipe Handling Equipment': 'Pipe Racks, Catwalk',
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a payload from the form data
    const ticketData = {
      EmployeeId: formData.EmployeeId,
      TicketNumber: 8000, // logic needed
      Status: 'Raised',
      TechnicianId : formData.TechnicianId,
      Sector: formData.Sector,
      TypeOfEquip: formData.TypeOfEquip,
      Priority: formData.Priority,
      Comment: formData.Comment,
    };

    // Make an Axios POST request to your API
    axios
      .post('https://localhost:7068/api/TicketInfo', ticketData)
      .then((response) => {
        console.log('Ticket submitted successfully:', response.data);
        // Optionally, reset the form or perform any other actions
        setFormData({
          EmployeeId: '',
          Sector: '',
          TypeOfEquip: '',
          Priority: 'Low', // Reset to default priority
          Comment: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting ticket:', error);
        alert('Error submitting ticket. -> ' + error.message);
      });
  };

  return (
    <div className='ticket-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='EmployeeId'>Employee ID</label>
          <input
            type='text'
            name='EmployeeId'
            value={formData.EmployeeId}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Sector'>Sector</label>
          <select
            name='Sector'
            value={formData.Sector}
            onChange={handleChange}
            required>
            <option value=''>Select Sector</option>
            {/* Map through sectors and create option elements */}
            {Object.keys(sectorEquipMapping).map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='TypeOfEquip'>Type of Equipment</label>
          <select
            name='TypeOfEquip'
            value={formData.TypeOfEquip}
            onChange={handleChange}
            required>
            <option value=''>Select Type of Equipment</option>
            {/* Map through types of equipment based on selected sector */}
            {formData.Sector &&
              sectorEquipMapping[formData.Sector].split(',').map((equip) => (
                <option key={equip} value={equip.trim()}>
                  {equip.trim()}
                </option>
              ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='Priority'>Priority</label>
          <select
            name='Priority'
            value={formData.Priority}
            onChange={handleChange}
            required>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Critical'>Critical</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='Comment'>Comment</label>
          <textarea
            name='Comment'
            value={formData.Comment}
            onChange={handleChange}
            required></textarea>
        </div>
        <button type='submit' className='btn btn-primary' style={{marginLeft:'49%'}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
