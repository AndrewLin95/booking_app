import React, { useState, useEffect } from 'react';
import Appointments from '../components/Appointments/Appointments';
import Guests from '../components/Guests/Guests';
import Services from '../components/Services/Services';
import Staffs from '../components/Staffs/Staffs';
import AddPopup from '../components/Popup/AddPopup';
import './style.css';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface
} from '../util/models';
import getInitData from '../apiCalls/getInitData';

const MilanoBooking = () => {
  const [popupState, setPopupState] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const _guestState = {} as GuestsInterface;
  const [guestState, setGuestState] = useState<GuestsInterface>(_guestState);

  const _staffInterface = {} as StaffsInterface;
  const [staffState, setStaffState] =
    useState<StaffsInterface>(_staffInterface);

  const _serviceInterface = {} as ServicesInterface;
  const [serviceState, setServiceState] =
    useState<ServicesInterface>(_serviceInterface);

  const handleAddBtnClick = (category: string) => {
    setPopupState(category);
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
      setServiceState(data?.dataService.services);
      setLoading(false);
    };

    pullInitData();
  }, []);

  useEffect(() => {
    console.log(staffState);
  }, [staffState]);

  // // Test API
  // const testAPI = async () => {
  //   console.log('test click');

  //   const data = {
  //     serviceHeader: 'Color',
  //     serviceName: 'Color',
  //     servicePrice: 40
  //   };

  //   const url = '/api/services';
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
      {showPopup && (
        <AddPopup closePopup={closePopup} popupState={popupState} />
      )}
      {/* <button onClick={testAPI}>TEST</button> */}
      <Guests
        handleAddBtnClick={handleAddBtnClick}
        guestState={guestState}
        loading={loading}
      />
      <Staffs
        handleAddBtnClick={handleAddBtnClick}
        staffState={staffState}
        loading={loading}
      />
      <Services
        handleAddBtnClick={handleAddBtnClick}
        serviceState={serviceState}
        loading={loading}
      />
      <Appointments />
    </div>
  );
};

export default MilanoBooking;
