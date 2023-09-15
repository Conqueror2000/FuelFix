import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import TechnicianForm from './components/TechnicianForm';
import LoginForm from './components/LoginForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import './App.css';

function App() {
  const [isEmployee, setIsEmployee] = useState(true);
  const location = useLocation();

  const [tick, setTickets] = useState([]);
  const updateTicketStatus = (updatedTicket) => {
    // Find the index of the updated ticket in the current tickets array
    const updatedIndex = tick.findIndex(
      (tick) => tick.TicketNumber === updatedTicket.TicketNumber
    );

    // Create a new array with the updated ticket
    const updatedTickets = [...tick];
    updatedTickets[updatedIndex] = updatedTicket;

    // Update the state with the new array of tickets
    setTickets(updatedTickets);
  };
  useEffect(() => {
    if (
      location.pathname === '/employee' ||
      location.pathname === '/technician'
    ) {
      document.body.classList.remove('default-theme');
    } else {
      document.body.classList.add('default-theme');
    }
  }, [location]);

  return (
    <div
      className={
        window.location.pathname === '/' ||
        window.location.pathname === '/register'
          ? 'App container'
          : void 0
      }>
      {window.location.pathname === '/' ||
      window.location.pathname === '/register' ? (
        <h1 className='text-center my-5'>

          {window.location.pathname === '/' ? 'FuelFix Maintenance Desk' : 'Register'}
        </h1>
      ) : (
        void 0
      )}
      <Routes>
        <Route
          path='/register'
          element={isEmployee ? <EmployeeForm /> : <TechnicianForm />}
        />
        <Route path='/employee' element={<EmployeeDashboard />} />
        <Route path='/technician' element={<TechnicianDashboard tick={tick}/>} updateTicketStatus={updateTicketStatus} />
        <Route path='/' element={<LoginForm />} />
      </Routes>
      {window.location.pathname === '/register' ? (
        <div className='text-center mt-3'>
          <button
            onClick={() => setIsEmployee(!isEmployee)}
            className='btn btn-primary'>
            {isEmployee ? 'Switch to Technician' : 'Switch to Employee'}
          </button>
        </div>
      ) : (
        void 0
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
