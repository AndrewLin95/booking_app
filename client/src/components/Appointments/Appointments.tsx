import React, { FC, useState, useEffect } from 'react';
import retrieveTodayDate from '../../util/retrieveTodayDate';
import AppointmentsCard from './AppointmentsCard';
import AddIcon from '@mui/icons-material/Add';
import { APPOINTMENT } from '../../util/constants';
interface Props {
  handleAddBtnClick: (category: string) => void;
}

const Appointments: FC<Props> = ({ handleAddBtnClick }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = retrieveTodayDate();
    setDate(today);
  }, []);

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

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
      <div className="cardMainContainer">
        <AppointmentsCard />
      </div>
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
