import React, { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpaIcon from '@mui/icons-material/Spa';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';

const AppointmentsCard = () => {
  return (
    <div className="cardContainerAppointment">
      <div className="cardContentAppointment">
        <div className="cardName">First Name Last Name</div>
        <div className="cardDescription">
          <AccessTimeIcon />
          Appointment start time - Appointment End time
        </div>
        <div className="cardDescription">
          <SpaIcon />
          Service Name
        </div>
        <div className="cardDescription">
          {' '}
          <PersonIcon /> Staff
        </div>
      </div>
      <div className="editBtn">
        <EditIcon />
      </div>
    </div>
  );
};

export default AppointmentsCard;
