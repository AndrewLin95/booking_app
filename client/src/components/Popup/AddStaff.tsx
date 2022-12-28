import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface
} from '../../util/models';
import { STAFF } from '../../util/constants';

interface Props {
  closePopup: () => void;
  updatePageStates: (
    category: string,
    data: GuestsInterface | StaffsInterface | ServicesInterface
  ) => void;
}

const AddStaff: FC<Props> = ({ closePopup, updatePageStates }) => {
  const submitToMongo = async (e: any) => {
    e.preventDefault();

    const data = {
      id: '',
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      title: e.target.title.value
    };

    const url = '/api/staffs';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      closePopup();
      updatePageStates(STAFF, data);
      await fetch(url, requestOptions);
    } catch (err) {
      // TODO: Error modal
      console.log(err);
    }
  };

  return (
    <div className="addInfoContainer">
      <div className="formHeader">
        <div>Add Staffs</div>
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
          name="title"
          type={'text'}
          placeholder="Job Title"
          required
        ></input>
        <div className="formBtnContainer">
          <button className="formBtn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
