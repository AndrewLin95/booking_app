import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface
} from '../../util/models';
import { SERVICE } from '../../util/constants';

interface Props {
  closePopup: () => void;
  updatePageStates: (
    category: string,
    data: GuestsInterface | StaffsInterface | ServicesInterface
  ) => void;
}

const AddService: FC<Props> = ({ closePopup, updatePageStates }) => {
  const submitToMongo = async (e: any) => {
    e.preventDefault();

    const data = {
      id: '',
      serviceHeader: e.target.serviceHeader.value,
      serviceName: e.target.serviceName.value,
      servicePrice: e.target.servicePrice.value
    };

    const url = '/api/services';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      closePopup();
      updatePageStates(SERVICE, data);
      await fetch(url, requestOptions);
    } catch (err) {
      // TODO: Error modal
      console.log(err);
    }
  };

  return (
    <div className="addInfoContainer">
      <div className="formHeader">
        <div>Add Services</div>
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
          name="serviceHeader"
          type={'text'}
          placeholder="Service Description"
          required
        ></input>
        <input
          name="serviceName"
          type={'text'}
          placeholder="Service Name"
          required
        ></input>
        <input
          name="servicePrice"
          type={'number'}
          placeholder="Price"
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

export default AddService;
