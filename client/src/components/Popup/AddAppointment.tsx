import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface,
  AppointmentsInterface
} from '../../util/models';
import { APPOINTMENT } from '../../util/constants';

interface Props {
  closePopup: () => void;
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

const AddAppointment: FC<Props> = ({
  closePopup,
  updatePageStates,
  guestState,
  staffState,
  serviceState
}) => {
  const submitToMongo = async (e: any) => {
    e.preventDefault();

    const data = {
      guestName: e.target.guestName.value,
      staffName: e.target.staffName.value,
      startTime: e.target.startTime.value,
      duration: e.target.duration.value,
      serviceHeader: e.target.serviceHeader.value,
      date: e.target.date.value
    };

    const url = '/api/appointments';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      closePopup();
      updatePageStates(APPOINTMENT, data);
      await fetch(url, requestOptions);
    } catch (err) {
      // TODO: Error modal
      console.log(err);
    }
  };

  return (
    <div className="addInfoContainer">
      <div className="formHeader">
        <div>Add Guests</div>
        <button className="closeBtn" onClick={() => closePopup()}>
          <CloseIcon />
        </button>
      </div>
      <form
        className="formContainer"
        onSubmit={(e) => {
          submitToMongo(e);
        }}
      >
        <select name="guestName">
          {Object.entries(guestState).map(([key, value]) => {
            return (
              <option key={key} value={`${value.firstName} ${value.lastName}`}>
                {value.firstName} {value.lastName}
              </option>
            );
          })}
        </select>

        <input type="date" name="date"></input>

        <input type="time" name="startTime"></input>

        <select name="duration">
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
          <option value={60}>60</option>
        </select>

        <select name="serviceHeader">
          {Object.entries(serviceState).map(([key, value]) => {
            return (
              <option key={key} value={`${value.serviceHeader}`}>
                {value.serviceHeader}
              </option>
            );
          })}
        </select>

        <select name="staffName">
          {Object.entries(staffState).map(([key, value]) => {
            return (
              <option key={key} value={`${value.firstName} ${value.lastName}`}>
                {value.firstName} {value.lastName}
              </option>
            );
          })}
        </select>

        <div className="formBtnContainer">
          <button className="formBtn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
