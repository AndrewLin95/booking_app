import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
// TODO pass guest information

const GuestCard = () => {
  return (
    <div className="cardContainer">
      <div className="cardName">Name</div>
      <div className="cardPhoneNumber">
        <LocalPhoneIcon fontSize="small" />
        Phone Number
      </div>
      <div className="cardEmail">
        <EmailIcon fontSize="small" />
        Email
      </div>
    </div>
  );
};

export default GuestCard;
