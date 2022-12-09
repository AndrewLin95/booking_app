import React, { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpaIcon from '@mui/icons-material/Spa';
import PersonIcon from '@mui/icons-material/Person';
import { AppointmentsInterface } from '../../util/models';
import './style.css';
import formatAppointmentTime from '../../util/formatAppointmentTime';

interface Props {
  appointment: AppointmentsInterface;
}

const AppointmentsCard: FC<Props> = ({ appointment }) => {
  const endTime = formatAppointmentTime(
    appointment.startTime,
    appointment.duration
  );

  return (
    <div className="cardContainerAppointment">
      <div className="cardContentAppointment">
        <div className="cardName">{appointment.guestName}</div>
        <div className="cardDescription">
          <AccessTimeIcon />
          {appointment.startTime} - {endTime}
        </div>
        <div className="cardDescription">
          <SpaIcon />
          {appointment.serviceHeader}
        </div>
        <div className="cardDescription">
          <PersonIcon /> {appointment.staffName}
        </div>
      </div>
      <div className="editBtn">
        <EditIcon />
      </div>
    </div>
  );
};

export default AppointmentsCard;
