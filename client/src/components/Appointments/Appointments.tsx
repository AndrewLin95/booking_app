import React, { FC, useState, useEffect } from 'react';
import retrieveTodayDate from '../../util/retrieveTodayDate';
import AppointmentsCard from './AppointmentsCard';
import AddIcon from '@mui/icons-material/Add';
import { APPOINTMENT } from '../../util/constants';
import { AppointmentsInterface } from '../../util/models';

interface Props {
  handleAddBtnClick: (category: string) => void;
  appointmentState: AppointmentsInterface[];
  loading: boolean;
  setAppointmentState: React.Dispatch<
    React.SetStateAction<AppointmentsInterface[]>
  >;
}

const Appointments: FC<Props> = ({
  handleAddBtnClick,
  appointmentState,
  loading,
  setAppointmentState
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
      console.log(data);
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
      console.log(data);
      setAppointmentState(data.appointments);
      setReload(false);
    } catch (err) {
      // TODO: Error model
      console.log(err);
    }
  };

  // edit appointment details
  const handleEditAppointment = async (
    staffName: string,
    date: string,
    startTime: number,
    endTime: number
  ) => {
    console.log('work');
    const data = {
      staffName: staffName,
      date: date,
      startTime: startTime,
      endTime: endTime
    };

    const url = `/api/appointments`;
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
        // refresh appointment data
      } else {
        return;
      }
    } catch (err) {
      //TODO error response
      console.log(err);
    }

    return;
  };

  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  console.log(appointmentState);
  return (
    <div className="appointmentsContainer">
      <div className="cardHeaderContainer">
        <div className="cardHeader">Appointments</div>
        <button className="editBtn" onClick={removeFilter}>
          Get All Dates
        </button>
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
