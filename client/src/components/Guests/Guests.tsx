import React, { FC } from 'react';
import GuestCard from './GuestCard';

interface Props {
  handleAddBtnClick: () => void;
}

const Guests: FC<Props> = ({ handleAddBtnClick }) => {
  return (
    <div className="guestsContainer">
      <div className="cardHeader"> Guests </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        <GuestCard />
      </div>
      <button onClick={handleAddBtnClick}>button</button>
    </div>
  );
};

export default Guests;
