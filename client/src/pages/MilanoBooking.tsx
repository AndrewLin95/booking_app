/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ServicesInterface,
  AppointmentsInterface
} from '../util/models';
import { GUEST, STAFF, SERVICE, APPOINTMENT } from '../util/constants';
import getInitData from '../apiCalls/getInitData';

const MilanoBooking = () => {
  const [popupState, setPopupState] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const _guestState = {} as GuestsInterface[];
  const [guestState, setGuestState] = useState<GuestsInterface[]>(_guestState);

  const _staffInterface = {} as StaffsInterface[];
  const [staffState, setStaffState] =
    useState<StaffsInterface[]>(_staffInterface);

  const _serviceInterface = {} as ServicesInterface[];
  const [serviceState, setServiceState] =
    useState<ServicesInterface[]>(_serviceInterface);

  const _appointmentInterface = {} as AppointmentsInterface[];
  const [appointmentState, setAppointmentState] = useState<
    AppointmentsInterface[]
  >(_appointmentInterface);

  // opens popup to add entries
  const handleAddBtnClick = (category: string) => {
    setPopupState(category);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // instead of fetching from server, pulls data and updates state directly.
  // to consider: if it is being used by multiple people, fetching from server will help with syncing issues
  const updatePageStates = (
    category: string,
    data:
      | GuestsInterface
      | StaffsInterface
      | ServicesInterface
      | AppointmentsInterface
  ) => {
    if (category === GUEST) {
      const tempArray: any[] = [...guestState];
      tempArray.push(data);
      setGuestState(tempArray);
    } else if (category === STAFF) {
      const tempArray: any[] = [...staffState];
      tempArray.push(data);
      setStaffState(tempArray);
    } else if (category === SERVICE) {
      const tempArray: any[] = [...serviceState];
      tempArray.push(data);
      setServiceState(tempArray);
    } else if (category === APPOINTMENT) {
      const tempArray: any[] = [...appointmentState];
      tempArray.push(data);
      setAppointmentState(tempArray);
    } else {
      console.log('unknown category');
    }
  };

  // on mount, retrieve initial data
  useEffect(() => {
    setLoading(true);

    const pullInitData = async () => {
      const data = await getInitData();
      setGuestState(data?.dataGuest.guests);
      setStaffState(data?.dataStaff.staffs);
      setServiceState(data?.dataService.services);
      setAppointmentState(data?.dataAppointments.appointments);
      setLoading(false);
    };

    pullInitData();
  }, []);

  // // Test API
  // const testAPI = async () => {
  //   console.log('test click');

  //   const data = {
  //     guestName: `Susan Carlson`,
  //     staffName: `Ronald Klein`,
  //     startTime: `6:15 PM`,
  //     duration: 45,
  //     serviceHeader: `Color`,
  //     date: `2022-12-08`
  //   };

  //   const url = '/api/appointments';
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

  // // TEST Function
  // const testFunction = () => {
  //   formatAppointmentTime('4:15 PM', 30);
  // };

  // const getInitalizationData = () => {
  //   // call to mongo to add guest to DB
  // };

  return (
    <div className="milanoBookingMain">
      {showPopup && (
        <AddPopup
          closePopup={closePopup}
          popupState={popupState}
          updatePageStates={updatePageStates}
          guestState={guestState}
          staffState={staffState}
          serviceState={serviceState}
        />
      )}
      {/* <button onClick={testAPI}>api</button> */}
      {/* <button onClick={testFunction}>func</button> */}
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
      <Appointments
        handleAddBtnClick={handleAddBtnClick}
        appointmentState={appointmentState}
        loading={loading}
        setAppointmentState={setAppointmentState}
      />
    </div>
  );
};

export default MilanoBooking;
