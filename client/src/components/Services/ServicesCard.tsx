import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ServicesCard = () => {
  return (
    <div className="cardContainer">
      <div className="cardName">Service</div>
      <div className="cardDescription">
        <ArrowRightIcon />
        Description and Price
      </div>
    </div>
  );
};

export default ServicesCard;
