import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface,
  AppointmentsInterface
} from '../../util/models';
import { APPOINTMENT, EDITAPPOINTMENT } from '../../util/constants';

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
  editInitialState: AppointmentsInterface;
  deletePageStates: () => void;
}

const EditAppointment: FC<Props> = ({
  closePopup,
  updatePageStates,
  guestState,
  staffState,
  serviceState,
  editInitialState,
  deletePageStates
}) => {
  // edit appointment details
  const handleEditAppointment = async (e: any) => {
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
      inputData: {
        staffName: editInitialState.staffName,
        date: editInitialState.date,
        startTime: editInitialState.startTime,
        endTime: editInitialState.endTime
      },
      newData: {
        guestName: e.target.guestName.value,
        staffName: e.target.staffName.value,
        startTime: startTime,
        endTime: endTime,
        duration: e.target.duration.value,
        serviceHeader: e.target.serviceHeader.value,
        date: e.target.date.value,
        isComplete: false,
        isCancelled: false
      }
    };

    console.log('EDIT DATA', data);

    const url = `/api/appointments`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(url, requestOptions);
      const _data = await response.json();
      if (_data.status === 'success') {
        updatePageStates(EDITAPPOINTMENT, data.newData);
      } else {
        return;
      }
    } catch (err) {
      //TODO error response
      console.log(err);
    }
    return;
  };

  return (
    <div className="addInfoContainer">
      <div className="formHeader">
        <div>Edit Appointments</div>
        <button className="closeBtn" onClick={() => closePopup()}>
          <CloseIcon />
        </button>
      </div>
      <form
        className="formContainer"
        onSubmit={(e) => {
          handleEditAppointment(e);
        }}
      >
        <select name="guestName">
          {Object.entries(guestState).map(([key, value]) => {
            const fullName = `${value.firstName} ${value.lastName}`;
            if (fullName === editInitialState.guestName) {
              return (
                <option key={key} value={fullName} selected>
                  {value.firstName} {value.lastName}
                </option>
              );
            } else {
              return (
                <option key={key} value={fullName}>
                  {value.firstName} {value.lastName}
                </option>
              );
            }
          })}
        </select>

        <input
          type="date"
          name="date"
          defaultValue={editInitialState.date}
        ></input>

        <input type="time" name="startTime"></input>

        <select name="duration">
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
          <option value={60}>60</option>
        </select>

        <select name="serviceHeader">
          {Object.entries(serviceState).map(([key, value]) => {
            if (value.serviceHeader === editInitialState.serviceHeader) {
              return (
                <option key={key} value={`${value.serviceHeader}`} selected>
                  {value.serviceHeader}
                </option>
              );
            } else {
              return (
                <option key={key} value={`${value.serviceHeader}`}>
                  {value.serviceHeader}
                </option>
              );
            }
          })}
        </select>

        <select name="staffName">
          {Object.entries(staffState).map(([key, value]) => {
            const fullName = `${value.firstName} ${value.lastName}`;
            if (fullName === editInitialState.staffName) {
              return (
                <option key={key} value={fullName} selected>
                  {value.firstName} {value.lastName}
                </option>
              );
            } else {
              return (
                <option key={key} value={fullName}>
                  {value.firstName} {value.lastName}
                </option>
              );
            }
          })}
        </select>

        <div className="formBtnContainer">
          <button className="formBtn" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAppointment;
