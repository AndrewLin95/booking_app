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
    const initialTime = e.target.startTime.value;
    const tempArray = initialTime.split('');
    let startTime;
    if (tempArray.length === 5) {
      startTime = parseInt(
        `${tempArray[0]}${tempArray[1]}${tempArray[3]}${tempArray[4]}`
      );
    } else {
      startTime = parseInt(`${tempArray[0]}${tempArray[2]}${tempArray[3]}`);
    }

    const endTime: number = startTime + parseInt(e.target.duration.value);

    const data = {
      id: '',
      guestName: e.target.guestName.value,
      staffName: e.target.staffName.value,
      startTime: startTime,
      endTime: endTime,
      duration: e.target.duration.value,
      serviceHeader: e.target.serviceHeader.value,
      date: e.target.date.value,
      isComplete: false,
      isCancelled: false
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

      const response = await fetch(url, requestOptions);
      const _data = await response.json();
      console.log(_data);
      if (_data.status === 'success') {
        updatePageStates(APPOINTMENT, data);
      } else {
        return;
      }
    } catch (err) {
      // TODO: Error modal
      console.log(err);
    }
  };

  return (
    <div className="addAppointmentContainer">
      <div className="formHeader">
        <div>Add Appointments</div>
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
        <div className="formInputContainer">
          <label className="formLabel">Guest Name: </label>
          <select name="guestName" className="formItem">
            {Object.entries(guestState).map(([key, value]) => {
              return (
                <option
                  key={key}
                  value={`${value.firstName} ${value.lastName}`}
                >
                  {value.firstName} {value.lastName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="formInputContainer">
          <label className="formLabel">Date: </label>
          <input type="date" name="date" className="formItem" />
        </div>

        <div className="formInputContainer">
          <label className="formLabel">Time: </label>
          <input type="time" name="startTime" className="formItem" />
        </div>

        <div className="formInputContainer">
          <label className="formLabel">Duration: </label>
          <select name="duration" className="formItem">
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
        </div>

        <div className="formInputContainer">
          <label className="formLabel">Service: </label>
          <select name="serviceHeader" className="formItem">
            {Object.entries(serviceState).map(([key, value]) => {
              return (
                <option key={key} value={`${value.serviceHeader}`}>
                  {value.serviceHeader}
                </option>
              );
            })}
          </select>
        </div>

        <div className="formInputContainer">
          <label className="formLabel">Staff: </label>
          <select name="staffName" className="formItem">
            {Object.entries(staffState).map(([key, value]) => {
              return (
                <option
                  key={key}
                  value={`${value.firstName} ${value.lastName}`}
                >
                  {value.firstName} {value.lastName}
                </option>
              );
            })}
          </select>
        </div>

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
