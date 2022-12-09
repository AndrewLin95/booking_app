import React, { FC } from 'react';
import AddGuest from './AddGuest';
import AddStaff from './AddStaff';
import AddService from './AddService';
import {
  GUEST,
  STAFF,
  SERVICE,
  APPOINTMENT,
  EDITAPPOINTMENT
} from '../../util/constants';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface,
  AppointmentsInterface
} from '../../util/models';
import './style.css';
import AddAppointment from './AddAppointment';
import EditAppointment from '../Appointments/EditAppointment';

interface Props {
  closePopup: () => void;
  popupState: string;
  updatePageStates: (
    category: string,
    data:
      | GuestsInterface
      | StaffsInterface
      | ServicesInterface
      | AppointmentsInterface
  ) => void;
  guestState: GuestsInterface[];
  staffState: StaffsInterface[];
  serviceState: ServicesInterface[];
}

const AddPopup: FC<Props> = ({
  closePopup,
  popupState,
  updatePageStates,
  guestState,
  staffState,
  serviceState
}) => {
  switch (popupState) {
    case GUEST:
      return (
        <div className="addPopupContainer">
          <AddGuest
            closePopup={closePopup}
            updatePageStates={updatePageStates}
          />
        </div>
      );
    case STAFF:
      return (
        <div className="addPopupContainer">
          <AddStaff
            closePopup={closePopup}
            updatePageStates={updatePageStates}
          />
        </div>
      );
    case SERVICE:
      return (
        <div className="addPopupContainer">
          <AddService
            closePopup={closePopup}
            updatePageStates={updatePageStates}
          />
        </div>
      );
    case APPOINTMENT:
      return (
        <div className="addPopupContainer">
          <AddAppointment
            closePopup={closePopup}
            updatePageStates={updatePageStates}
            guestState={guestState}
            staffState={staffState}
            serviceState={serviceState}
          />
        </div>
      );
    case EDITAPPOINTMENT:
      return (
        <div className="addPopupContainer">
          <EditAppointment />
        </div>
      );
    default:
      return <div>Unknown category selected</div>;
  }
};

export default AddPopup;
