import React, { FC } from 'react';
import { GuestsInterface } from '../../util/models';
import GuestCard from './GuestCard';

interface Props {
  handleAddBtnClick: () => void;
  guestState: GuestsInterface;
  loading: boolean;
}

const Guests: FC<Props> = ({ handleAddBtnClick, guestState, loading }) => {
  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  return (
    <div className="guestsContainer">
      <div className="cardHeader"> Guests </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        {Object.entries(guestState).map(([key, value]) => {
          return <GuestCard key={key} guest={value} />;
        })}
      </div>
      <button onClick={handleAddBtnClick}>button</button>
    </div>
  );
};

export default Guests;
