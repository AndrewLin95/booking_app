import React from 'react';
import StaffsCard from './StaffsCard';

const Staffs = () => {
  return (
    <div className="staffsContainer">
      <div className="cardHeader">Staffs </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        <StaffsCard />
      </div>
    </div>
  );
};

export default Staffs;
