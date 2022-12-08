import React, { FC } from 'react';
import { GuestsInterface } from '../../util/models';
import { GUEST } from '../../util/constants';
import GuestCard from './GuestCard';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleAddBtnClick: (category: string) => void;
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
      <div className="addBtnContainer">
        <button className="addBtn" onClick={() => handleAddBtnClick(GUEST)}>
          <AddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Guests;
