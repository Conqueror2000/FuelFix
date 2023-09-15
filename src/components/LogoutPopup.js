import React from 'react';

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className='logout-popup'>
      <div className='popup-content'>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className='popup-buttons'>
          <button className='popup-button confirm' onClick={onConfirm}>
            Yes
          </button>
          <button className='popup-button cancel' onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;