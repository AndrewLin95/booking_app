import React, { FC } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { GuestsInterface } from '../../util/models';
// TODO pass guest information

interface Props {
  guest: GuestsInterface;
}

const GuestCard: FC<Props> = ({ guest }) => {
  return (
    <div className="cardContainer">
      <div className="cardName">
        {guest.firstName} {guest.lastName}
      </div>
      <div className="cardPhoneNumber">
        <LocalPhoneIcon fontSize="small" />
        {guest.phoneNumber}
      </div>
      <div className="cardEmail">
        <EmailIcon fontSize="small" />
        {guest.email}
      </div>
    </div>
  );
};

export default GuestCard;
