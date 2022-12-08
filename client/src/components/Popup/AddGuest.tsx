import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  closePopup: () => void;
}

const AddGuest: FC<Props> = ({ closePopup }) => {
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
          placeholder="Phone Number"
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
