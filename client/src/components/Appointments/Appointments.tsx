import React, { FC, useState, useEffect } from 'react';
import retrieveTodayDate from '../../util/retrieveTodayDate';
import AppointmentsCard from './AppointmentsCard';
import AddIcon from '@mui/icons-material/Add';
import { APPOINTMENT } from '../../util/constants';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface,
  AppointmentsInterface
} from '../../util/models';
import { EDITAPPOINTMENT } from '../../util/constants';

interface Props {
  handleAddBtnClick: (category: string) => void;
  appointmentState: AppointmentsInterface[];
  loading: boolean;
  setAppointmentState: React.Dispatch<
    React.SetStateAction<AppointmentsInterface[]>
  >;
  handleEditState: (initialState: AppointmentsInterface) => void;
  updatePageStates: (
    category: string,
    data:
      | GuestsInterface
      | StaffsInterface
      | ServicesInterface
      | AppointmentsInterface
  ) => void;
}

const Appointments: FC<Props> = ({
  handleAddBtnClick,
  appointmentState,
  loading,
  setAppointmentState,
  handleEditState,
  updatePageStates
}) => {
  const [date, setDate] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const today = retrieveTodayDate();
    setDate(today);
  }, []);

  // to pull all appointments from that date only
  const handleDateChange = async (e: any) => {
    setReload(true);
    setDate(e.target.value);

    const url = `/api/appointments/${e.target.value}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setAppointmentState(data.appointments);
      setReload(false);
    } catch (err) {
      // TODO: Error model
      console.log(err);
    }
  };

  // pulls all appointment data
  const removeFilter = async () => {
    setReload(true);
    const url = `/api/appointments/`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setAppointmentState(data.appointments);
      setReload(false);
    } catch (err) {
      // TODO: Error model
      console.log(err);
    }
  };

  // pulls all completed appointments
  const allCompleted = async () => {
    setReload(true);
    const url = `/api/appointments/complete`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setAppointmentState(data.appointments);
      setReload(false);
    } catch (err) {
      // TODO: Error model
      console.log(err);
    }
  };

  // pulls all cancelled appointments
  const allCancelled = async () => {
    setReload(true);
    const url = `/api/appointments/cancel`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setAppointmentState(data.appointments);
      setReload(false);
    } catch (err) {
      // TODO: Error model
      console.log(err);
    }
  };

  // completes an appointment
  const completeAppointment = async (data: AppointmentsInterface) => {
    setReload(true);
    const url = `/api/appointments/complete`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(url, requestOptions);
      const _data = await response.json();
      if (_data.status === 'success') {
        updatePageStates(EDITAPPOINTMENT, data);
        setReload(false);
      } else {
        return;
      }
    } catch (err) {
      //TODO error response
      console.log(err);
    }
  };

  // cancels an appointment
  const cancelAppointment = async (data: AppointmentsInterface) => {
    setReload(true);
    const url = `/api/appointments/cancel`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(url, requestOptions);
      const _data = await response.json();
      if (_data.status === 'success') {
        updatePageStates(EDITAPPOINTMENT, data);
        setReload(false);
      } else {
        return;
      }
    } catch (err) {
      //TODO error response
      console.log(err);
    }
  };

  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  return (
    <div className="appointmentsContainer">
      <div className="cardHeaderContainer">
        <div className="cardHeader">Appointments</div>
        <div>
          <button className="editBtn" onClick={removeFilter}>
            Get All Dates
          </button>
          <button className="editBtn" onClick={allCompleted}>
            Get All Completed
          </button>
          <button className="editBtn" onClick={allCancelled}>
            Get All Cancelled
          </button>
        </div>
      </div>

      <div className="cardSeparator"></div>
      <input
        type="date"
        value={date}
        name="dateSelector"
        onChange={(e) => {
          handleDateChange(e);
        }}
      />
      {!reload && (
        <div className="cardMainContainer">
          {Object.entries(appointmentState).map(([key, value]) => {
            return (
              <AppointmentsCard
                key={key}
                appointment={value}
                handleAddBtnClick={handleAddBtnClick}
                handleEditState={handleEditState}
                completeAppointment={completeAppointment}
                cancelAppointment={cancelAppointment}
              />
            );
          })}
        </div>
      )}
      <div className="addBtnContainer">
        <button
          className="addBtn"
          onClick={() => handleAddBtnClick(APPOINTMENT)}
        >
          <AddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Appointments;
