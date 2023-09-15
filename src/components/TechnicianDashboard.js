import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TicketForm from './TicketForm';
import '../styles/EmployeeDashboard.css';
import PieChartComponent from './PieChartComponent';
import BarGraph from './BarGraph';
import { NameOfUser } from './LoginForm';
import { useNavigate } from 'react-router-dom';

const TechnicianDashboard = ({ tick, updateTicketstatus }) => {
  const [selectedOption] = useState('Show Tickets');
  const [tickets, setTickets] = useState([
    {
      ticketNumber: 1,
      sector: 'IT',
      typeOfEquip: 'Laptop',
      status: 'Active',
      employeeId: 'E002',
      priority: 'High',
      comment: 'Not working',
      technicianId: 'T002',
    },
    {
      ticketNumber: 1,
      sector: 'IT',
      typeOfEquip: 'Laptop',
      status: 'Active',
      employeeId: 'E002',
      priority: 'High',
      comment: 'Not working',
      technicianId: 'T002',
    },
    {
      ticketNumber: 2,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Completed',
      employeeId: 'E005',
      priority: 'Medium',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 3,
      sector: 'HR',
      typeOfEquip: 'Mouse',
      status: 'Onhold',
      employeeId: 'E0012',
      priority: 'Low',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 4,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Raised',
      employeeId: 'E0018',
      priority: 'Critical',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 5,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Raised',
      employeeId: 'E007',
      priority: 'Medium',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 6,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Raised',
      employeeId: 'E0011',
      priority: 'Medium',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 7,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Raised',
      employeeId: 'E009',
      priority: 'Medium',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
    {
      ticketNumber: 8,
      sector: 'HR',
      typeOfEquip: 'Printer',
      status: 'Raised',
      employeeId: 'E0077',
      priority: 'Medium',
      comment: 'Paper jam',
      technicianId: 'T002',
    },
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // New state variables for sorting
  const [sortCriteria, setSortCriteria] = useState('ticketNumber');
  const [sortOrder, setSortOrder] = useState('asc');

  //New state varible for filtering
  const [filterstatus, setFilterstatus] = useState('All');
  const [filterpriority, setFilterpriority] = useState('All');

  // New state variable to store the updated status
  const [newstatus, setNewstatus] = useState('');

  // Use state to manage the popup visibility
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  // Define the ticket status values
  const RaisedTickets = tickets.filter(
    (ticket) => ticket.status === 'Raised'
  ).length;
  const CompletedTickets = tickets.filter(
    (ticket) => ticket.status === 'Completed'
  ).length;
  const OnholdTickets = tickets.filter(
    (ticket) => ticket.status === 'Onhold'
  ).length;
  const ActiveTickets = tickets.filter(
    (ticket) => ticket.status === 'Active'
  ).length;

  const CriticalTickets = tickets.filter(
    (ticket) => ticket.priority === 'Critical'
  ).length;
  const HighTickets = tickets.filter(
    (ticket) => ticket.priority === 'High'
  ).length;
  const MediumTickets = tickets.filter(
    (ticket) => ticket.priority === 'Medium'
  ).length;
  const LowTickets = tickets.filter(
    (ticket) => ticket.priority === 'Low'
  ).length;

  useEffect(() => {
    // const
    axios
      .get('http://localhost:5000/api/tickets')
      .then((response) => {
        setTickets((prevTickets) => [...prevTickets, ...response.data]);
      })
      .catch((error) => {
        console.error('There was an error fetching data:', error);
      });
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeMiniScreen = () => {
    setSelectedTicket(null);
  };

  // const handleShowTickets = () => {
  //   setSelectedOption('Show Tickets');
  // };

  // const handleRaiseTicket = () => {
  //   setSelectedOption('Raise Ticket');
  // };


  function getstatusColor(status) {
    switch (status) {
      case 'Raised':
        return 'gray';
      case 'Active':
        return '#b400d8';
      case 'Onhold':
        return 'red';
      case 'Completed':
        return 'green';
      default:
        return 'black'; // Default color if status is not recognized
    }
  }

  // New sorting function
  const sortedTickets = useMemo(() => {
    let filteredTickets = tickets;

    if (filterstatus !== 'All') {
      filteredTickets = tickets.filter(
        (ticket) => ticket.status === filterstatus
      );
    }

    if (filterpriority !== 'All') {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.priority === filterpriority
      );
    }

    return filteredTickets.sort((a, b) => {
      if (sortCriteria === 'priority') {
        const priorityOrder = ['Low', 'Medium', 'High', 'Critical'];
        return sortOrder === 'asc'
          ? priorityOrder.indexOf(a.priority) -
              priorityOrder.indexOf(b.priority)
          : priorityOrder.indexOf(b.priority) -
              priorityOrder.indexOf(a.priority);
      } else {
        return sortOrder === 'asc'
          ? a.ticketNumber - b.ticketNumber
          : b.ticketNumber - a.ticketNumber;
      }
    });
  }, [tickets, sortCriteria, sortOrder, filterstatus, filterpriority]);

  const data = [RaisedTickets, CompletedTickets, OnholdTickets, ActiveTickets];
  const fieldNames = ['Critical', 'High', 'Medium', 'Low'];
  const fieldValues = [CriticalTickets, HighTickets, MediumTickets, LowTickets];

  const handlestatusChange = (event) => {
    setNewstatus(event.target.value);
  };

  const handleEdit = () => {
    if (selectedTicket && newstatus !== '') {
      // Create an object with the updated ticket data
      const updatedTicket = {
        ...selectedTicket,
        status: newstatus,
      };

      // Send a POST request to update the ticket in the database
      axios
        .post('http://localhost:5000/api/update-ticket', updatedTicket)
        .then((response) => {
          // Handle success
          console.log('Ticket status updated successfully:', response.data);

          // Close the mini-screen
          closeMiniScreen();

          // Update the tickets in the parent component's state
          updateTicketstatus(updatedTicket);
        })
        .catch((error) => {
          // Handle error
          alert(error.message);
          console.error('Error updating ticket status:', error);
        });
    }
  };

  // Function to handle logout button click
  const handleShowLogoutPopup = () => {
    setShowLogoutPopup(true);
  };

  // Function to cancel logout
  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleLogout = () => {
    // Show the logout confirmation popup
    setShowLogoutPopup(true);
  };
  // Function to confirm and perform logout
  const handleConfirmLogout = () => {
    // Implement logout logic here
    // For example, clear user authentication state and redirect to the login page

    // Redirect to the '/' route after successful logout
    navigate('/');
  };

  // Render the logout confirmation popup if showLogoutPopup is true
  const renderLogoutPopup = () => {
    return (
      <div
        className='logout-popup'
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
          textAlign: 'center',
        }}>
        <p
          style={{
            fontSize: '18px',
            marginBottom: '10px',
          }}>
          Are you sure you want to log out?
        </p>

        <button
          className='logout-button'
          onClick={handleConfirmLogout}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            marginRight: '10px',
          }}>
          Yes
        </button>

        <button
          className='cancel-button'
          onClick={handleCancelLogout}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
          }}>
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className='employee-dashboard'>
      <div className='right-section' style={{ backgroundColor: '#E8EBEE' }}>
        <h1
          style={{
            backgroundColor: '#F5F5F5',
            padding: '15px',
            marginTop: '-20px',
            marginLeft: '-20px',
            width: '103.5%',
            paddingLeft: '20px',
          }}>
          {NameOfUser} Dashboard
        </h1>

        {/* Sorting & filtering controls, only visible when 'Show Tickets' is selected */}
        {selectedOption === 'Show Tickets' && (
          <div className='sorting-controls'>
            <h4>Sort and Filter Tickets</h4>
            <div className='sort-filter-section'>
              <div className='sort-filter-item'>
                <label className='label1'>SortBy: </label>
                <select onChange={(e) => setSortCriteria(e.target.value)}>
                  <option value='ticketNumber'> Ticket Number</option>
                  <option value='priority'>Sort by priority</option>
                </select>
              </div>
              <div className='sort-filter-item'>
                <label className='label1'>Order: </label>
                <select onChange={(e) => setSortOrder(e.target.value)}>
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
                </select>
              </div>
              <div className='sort-filter-item'>
                <label className='label1'>status: </label>
                <select onChange={(e) => setFilterstatus(e.target.value)}>
                  <option value='All'>All</option>
                  <option value='Active'>Active</option>
                  <option value='Onhold'>OnHold</option>
                  <option value='Completed'>Completed</option>
                  <option value='Raised'>Raised</option>
                </select>
              </div>
              <div className='sort-filter-item'>
                <label className='label1'>priority: </label>
                <select onChange={(e) => setFilterpriority(e.target.value)}>
                  <option value='All'>All</option>
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                  <option value='Critical'>Critical</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Existing functionality for raising a ticket */}
        {selectedOption === 'Raise Ticket' && <TicketForm />}

        {/* Existing functionality for showing tickets */}
        {selectedOption === 'Show Tickets' && (
          <div>
            {sortedTickets.map((ticket) => (
              <div
                style={{
                  backgroundColor: '#F5F5F5',
                  marginLeft: '30px',
                  width: '95%',
                }}
                key={ticket.ticketNumber}
                onClick={() => handleTicketClick(ticket)}
                className='ticket-item'>
                <h4 className='ticket-number'>Ticket #{ticket.ticketNumber}</h4>
                <hr className='line-separator' />
                <div className='ticket-info-container'>
                  <p className='ticket-info comment'>
                    comment: {ticket.comment}
                  </p>
                  <p
                    className='ticket-info status'
                    style={{ color: getstatusColor(ticket.status) }}>
                    status: {ticket.status}
                  </p>
                </div>
                <div className={`ticket-info-container`}>
                  <p className='ticket-info assigned-to'>
                    Employee: {ticket.employeeId}
                  </p>
                  <p className='ticket-info priority'>
                    priority: {ticket.priority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='left-section'>
        {/* <div className='button-group'>
          <h4>Actions</h4>
          <button
            className={`button1 ${
              selectedOption === 'Show Tickets' ? 'active' : ''
            }`}
            onClick={handleShowTickets}>
            Show Tickets
          </button>
          <button
            className={`button1 ${
              selectedOption === 'Raise Ticket' ? 'active' : ''
            }`}
            onClick={handleRaiseTicket}>
            Raise Ticket
          </button>
        </div> */}
        <div>
          <div style={{ height: '150px' }}>
            <PieChartComponent data={data} />
          </div>
          <h4>Bar Graph Example</h4>
          <div style={{ maxHeight: '150px' }}>
            <BarGraph labels={fieldNames} values={fieldValues} />
          </div>
        </div>
        <div className='ticket-status-box'>
          <h3>
            Total Tickets:-{' '}
            {RaisedTickets + CompletedTickets + OnholdTickets + ActiveTickets}
          </h3>
          <ul>
            <li>Yet To Assign:- {RaisedTickets}</li>
            <li>Resolved:- {CompletedTickets}</li>
            <li>Onhold:- {OnholdTickets}</li>
            <li>Active:- {ActiveTickets}</li>
          </ul>
        </div>
        <button className='button-logout' onClick={handleLogout}>
          Logout
        </button>
      </div>

      {selectedTicket && (
        <div className='ticket-details-mini-screen'>
          <h3>Details for Ticket #{selectedTicket.ticketNumber}</h3>
          <p>sector: {selectedTicket.sector}</p>
          <p>Type of Equipment: {selectedTicket.typeOfEquip}</p>
          <p>status: {selectedTicket.status}</p>
          <p>Date: {selectedTicket.Date}</p>
          <p>Employee ID: {selectedTicket.employeeId}</p>
          <p>priority: {selectedTicket.priority}</p>
          <p>comment: {selectedTicket.comment}</p>
          <p>Assigned To: {selectedTicket.technicianId}</p>
          <div className='ticket-info-container'>
            <p className='ticket-info status'>
              Edit status:
              <select onChange={handlestatusChange} value={newstatus}>
                <option value='Active'>Active</option>
                <option value='Onhold'>OnHold</option>
                <option value='Completed'>Completed</option>
              </select>
            </p>
          </div>
          <div className='button-container'>
            <button
              className='button2 edit-button'
              onClick={handleEdit}
              style={{ marginRight: '225px' }}>
              Submit
            </button>
            <button className='button2' onClick={closeMiniScreen}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Render the logout confirmation popup if showLogoutPopup is true */}
      {showLogoutPopup && renderLogoutPopup()}
    </div>
  );
};

export default TechnicianDashboard;
