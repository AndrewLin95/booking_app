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
import {
  GUEST,
  STAFF,
  SERVICE,
  APPOINTMENT,
  EDITAPPOINTMENT
} from '../util/constants';
import getInitData from '../apiCalls/getInitData';
import getAppointments from '../apiCalls/getAppointments';

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
      setGuestState([...guestState, data as GuestsInterface]);
    } else if (category === STAFF) {
      setStaffState([...staffState, data as StaffsInterface]);
    } else if (category === SERVICE) {
      setServiceState([...serviceState, data as ServicesInterface]);
    } else if (category === APPOINTMENT) {
      setAppointmentState([...appointmentState, data as AppointmentsInterface]);
    } else if (category === EDITAPPOINTMENT) {
      const fetchAppointments = async () => {
        try {
          const data = await getAppointments();
          setAppointmentState(data.appointments);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAppointments();
    } else {
      console.log('unknown category');
    }
  };

  const deletePageStates = () => {
    const tempArray = appointmentState.splice(
      appointmentState.indexOf(editInitialState),
      1
    );
    setAppointmentState([...tempArray]);
  };

  // passes initial state for what is being editted
  const _editInitalStateInterface = {} as AppointmentsInterface;
  const [editInitialState, setEditInitialState] =
    useState<AppointmentsInterface>(_editInitalStateInterface);

  const handleEditState = (initialState: AppointmentsInterface) => {
    setEditInitialState(initialState);
  };

  useEffect(() => {
    console.log('here', editInitialState);
  }, [editInitialState]);

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
          editInitialState={editInitialState}
          deletePageStates={deletePageStates}
        />
      )}
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
        handleEditState={handleEditState}
      />
    </div>
  );
};

export default MilanoBooking;
