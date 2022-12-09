import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface
} from '../../util/models';
import { GUEST } from '../../util/constants';

interface Props {
  closePopup: () => void;
  updatePageStates: (
    category: string,
    data: GuestsInterface | StaffsInterface | ServicesInterface
  ) => void;
}

const AddGuest: FC<Props> = ({ closePopup, updatePageStates }) => {
  const submitToMongo = async (e: any) => {
    e.preventDefault();

    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value
    };

    const url = '/api/guests';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      closePopup();
      updatePageStates(GUEST, data);
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
        <input
          name="firstName"
          type={'text'}
          placeholder="First Name"
          required
        ></input>
        <input
          name="lastName"
          type={'text'}
          placeholder="Last Name"
          required
        ></input>
        <input
          name="phoneNumber"
          type={'tel'}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number (111-111-1111)"
          required
        ></input>
        <input name="email" type={'email'} placeholder="Email" required></input>
        <div className="formBtnContainer">
          <button className="formBtn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGuest;
