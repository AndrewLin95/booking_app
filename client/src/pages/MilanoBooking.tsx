import React, { useState, useEffect } from 'react';
import Appointments from '../components/Appointments/Appointments';
import Guests from '../components/Guests/Guests';
import Services from '../components/Services/Services';
import Staffs from '../components/Staffs/Staffs';
import AddPopup from '../components/Popup/AddPopup';
import './style.css';
import { GuestsInterface, StaffsInterface } from '../util/models';
import getInitData from '../apiCalls/getInitData';

const MilanoBooking = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const _guestState = {} as GuestsInterface;
  const [guestState, setGuestState] = useState<GuestsInterface>(_guestState);

  const _staffInterface = {} as StaffsInterface;
  const [staffState, setStaffState] =
    useState<StaffsInterface>(_staffInterface);

  const handleAddBtnClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // on mount, retrieve initial data
  useEffect(() => {
    setLoading(true);

    const pullInitData = async () => {
      const data = await getInitData();
      setGuestState(data?.dataGuest.guests);
      setStaffState(data?.dataStaff.staffs);
      setLoading(false);
    };

    pullInitData();
  }, []);

  useEffect(() => {
    console.log(staffState);
  }, [staffState]);

  //Test API
  // const testAPI = async () => {
  //   console.log('test click');

  //   const data = {
  //     firstName: 'Ronald',
  //     lastName: 'Klein',
  //     title: 'Hair Stylist'
  //   };

  //   const url = '/api/staffs';
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   };

  //   const response = await fetch(url, requestOptions);
  //   // const data = await response.json();

  //   // console.log(data);
  // };

  // const getInitalizationData = () => {
  //   // call to mongo to add guest to DB
  // };

  return (
    <div className="milanoBookingMain">
      {showPopup && <AddPopup closePopup={closePopup} />}
      {/* <button onClick={testAPI}>TEST</button> */}
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
