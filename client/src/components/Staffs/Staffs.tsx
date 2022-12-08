import React, { FC } from 'react';
import { StaffsInterface } from '../../util/models';
import StaffsCard from './StaffsCard';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleAddBtnClick: (category: string) => void;
  staffState: StaffsInterface;
  loading: boolean;
}

const Staffs: FC<Props> = ({ handleAddBtnClick, staffState, loading }) => {
  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  return (
    <div className="staffsContainer">
      <div className="cardHeader">Staffs </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        {Object.entries(staffState).map(([key, value]) => {
          return <StaffsCard key={key} staff={value} />;
        })}
      </div>
      <div className="addBtnContainer">
        <button className="addBtn" onClick={() => handleAddBtnClick('staff')}>
          <AddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Staffs;
