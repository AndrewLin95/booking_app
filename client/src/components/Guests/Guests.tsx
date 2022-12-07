import React from 'react';
import GuestCard from './GuestCard';

const Guests = () => {
  return (
    <div className="guestsContainer">
      <div className="cardHeader"> Guests </div>
      <div className="cardSeparator"></div>
      <GuestCard />
    </div>
  );
};

export default Guests;
