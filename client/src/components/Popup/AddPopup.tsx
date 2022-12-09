import React, { FC } from 'react';
import AddGuest from './AddGuest';
import AddStaff from './AddStaff';
import AddService from './AddService';
import { GUEST, STAFF, SERVICE } from '../../util/constants';
import {
  GuestsInterface,
  StaffsInterface,
  ServicesInterface
} from '../../util/models';
import './style.css';

interface Props {
  closePopup: () => void;
  popupState: string;
  updatePageStates: (
    category: string,
    data: GuestsInterface | StaffsInterface | ServicesInterface
  ) => void;
}

const AddPopup: FC<Props> = ({ closePopup, popupState, updatePageStates }) => {
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
          <AddStaff closePopup={closePopup} />
        </div>
      );
    case SERVICE:
      return (
        <div className="addPopupContainer">
          <AddService closePopup={closePopup} />
        </div>
      );
    default:
      return <div>Unknown category selected</div>;
  }
};

export default AddPopup;
