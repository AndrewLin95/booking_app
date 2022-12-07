import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const StaffsCard = () => {
  return (
    <div className="cardContainer">
      <div className="cardName">Name</div>
      <div className="cardDescription">
        <ArrowRightIcon />
        Title
      </div>
    </div>
  );
};

export default StaffsCard;
