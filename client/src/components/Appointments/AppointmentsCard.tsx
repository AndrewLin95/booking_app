import React, { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import SpaIcon from '@mui/icons-material/Spa';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { EDITAPPOINTMENT } from '../../util/constants';
import { AppointmentsInterface } from '../../util/models';
import './style.css';
import formatAppointmentTime from '../../util/formatAppointmentEndTime';
import formatAppointmentStartTime from '../../util/formatAppointmentStartTime';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  appointment: AppointmentsInterface;
  handleAddBtnClick: (category: string) => void;
  handleEditState: (initialState: AppointmentsInterface) => void;
  completeAppointment: (data: AppointmentsInterface) => void;
  cancelAppointment: (data: AppointmentsInterface) => void;
}

const AppointmentsCard: FC<Props> = ({
  appointment,
  handleAddBtnClick,
  handleEditState,
  completeAppointment,
  cancelAppointment
}) => {
  const endTime = formatAppointmentTime(
    appointment.startTime,
    appointment.duration
  );
  const startTime = formatAppointmentStartTime(appointment.startTime);

  return (
    <div className="cardContainerAppointment">
      <div className="cardContentAppointment">
        <div className="cardName">{appointment.guestName}</div>
        <div className="cardDescription">
          <AccessTimeIcon />
          {startTime} - {endTime}
        </div>
        <div className="cardDescription">
          <DateRangeIcon />
          {appointment.date}
        </div>
        <div className="cardDescription">
          <SpaIcon />
          {appointment.serviceHeader}
        </div>
        <div className="cardDescription">
          <PersonIcon /> {appointment.staffName}
        </div>
      </div>
      <div className="apppointmentBtnContainer">
        <button
          onClick={() => {
            completeAppointment(appointment);
          }}
          className="appointmentBtns"
        >
          <CheckIcon />
        </button>
        <button
          onClick={() => {
            handleAddBtnClick(EDITAPPOINTMENT);
            handleEditState(appointment);
          }}
          className="appointmentBtns"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => {
            cancelAppointment(appointment);
          }}
          className="appointmentBtns"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default AppointmentsCard;
