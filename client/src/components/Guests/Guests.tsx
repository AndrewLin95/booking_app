import React, { FC } from 'react';
import GuestCard from './GuestCard';

interface Props {
  testAPI: () => void;
}

const Guests: FC<Props> = ({ testAPI }) => {
  return (
    <div className="guestsContainer">
      <div className="cardHeader"> Guests </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        <GuestCard />
      </div>
      <button onClick={testAPI}>button</button>
    </div>
  );
};

export default Guests;
