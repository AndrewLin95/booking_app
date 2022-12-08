import React, { FC } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { StaffsInterface } from '../../util/models';

interface Props {
  staff: StaffsInterface;
}

const StaffsCard: FC<Props> = ({ staff }) => {
  return (
    <div className="cardContainer">
      <div className="cardName">
        {staff.firstName} {staff.lastName}
      </div>
      <div className="cardDescription">
        <ArrowRightIcon />
        {staff.title}
      </div>
    </div>
  );
};

export default StaffsCard;
