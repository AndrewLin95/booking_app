import React, { useState, useEffect } from 'react';
import retrieveTodayDate from '../../util/retrieveTodayDate';

const Appointments = () => {
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
      date Selectors
    </div>
  );
};

export default Appointments;
