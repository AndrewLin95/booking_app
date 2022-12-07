import React from 'react';
import Appointments from '../components/Appointments/Appointments';
import Guests from '../components/Guests/Guests';
import Services from '../components/Services/Services';
import Staffs from '../components/Staffs/Staffs';
import './style.css';

const MilanoBooking = () => {
  return (
    <div className="milanoBookingMain">
      <Guests />
      <Staffs />
      <Services />
      <Appointments />
    </div>
  );
};

export default MilanoBooking;
