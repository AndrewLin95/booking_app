import React, { useState, useEffect } from 'react';
import Appointments from '../components/Appointments/Appointments';
import Guests from '../components/Guests/Guests';
import Services from '../components/Services/Services';
import Staffs from '../components/Staffs/Staffs';
import AddPopup from '../components/Popup/AddPopup';
import './style.css';
import { GuestsInterface } from '../util/models';

const MilanoBooking = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const _guestState = {} as GuestsInterface;
  const [guestState, setGuestState] = useState<GuestsInterface>(_guestState);

  const handleAddBtnClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // on mount, retrieve initial data
  useEffect(() => {
    setLoading(true);
    const fetchInitData = async () => {
      const url = '/api/guests';
      const requestOptions = {
        method: 'GET'
      };

      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setGuestState(data.guests);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitData();
  }, []);

  useEffect(() => {
    console.log(guestState);
  }, [guestState]);

  // const testAPI = async () => {
  //   // test api
  //   console.log('test click');

  //   const url = '/api/guests';
  //   const requestOptions = {
  //     method: 'POST'
  //   };

  //   const response = await fetch(url, requestOptions);
  //   const data = await response.json();

  //   console.log(data);
  // };

  // const getInitalizationData = () => {
  //   // call to mongo to add guest to DB
  // };

  return (
    <div className="milanoBookingMain">
      {showPopup && <AddPopup closePopup={closePopup} />}
      <Guests
        handleAddBtnClick={handleAddBtnClick}
        guestState={guestState}
        loading={loading}
      />
      <Staffs />
      <Services />
      <Appointments />
    </div>
  );
};

export default MilanoBooking;
