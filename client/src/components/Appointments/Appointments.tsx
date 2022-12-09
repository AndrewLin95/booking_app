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

  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  console.log(appointmentState);
  return (
    <div className="appointmentsContainer">
      <div className="cardHeader">Appointments </div>
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
            return <AppointmentsCard key={key} appointment={value} />;
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
