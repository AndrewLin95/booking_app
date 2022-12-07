import React from 'react';
import Appointments from '../components/Appointments/Appointments';
import Guests from '../components/Guests/Guests';
import Services from '../components/Services/Services';
import Staffs from '../components/Staffs/Staffs';
import './style.css';

const MilanoBooking = () => {
  const testAPI = async () => {
    // test api
    console.log('test click');

    const url = '/api/guests';
    const requestOptions = {
      method: 'GET'
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log(data);
  };

  const getInitalizationData = () => {
    // call to mongo to add guest to DB
  };

  return (
    <div className="milanoBookingMain">
      <Guests testAPI={testAPI} />
      <Staffs />
      <Services />
      <Appointments />
    </div>
  );
};

export default MilanoBooking;
