import React, { FC } from 'react';
import AddGuest from './AddGuest';
import AddStaff from './AddStaff';
import { GUEST, STAFF, SERVICE } from '../../util/constants';
import './style.css';

interface Props {
  closePopup: () => void;
  popupState: string;
}

const AddPopup: FC<Props> = ({ closePopup, popupState }) => {
  switch (popupState) {
    case GUEST:
      return (
        <div className="addPopupContainer">
          <AddGuest closePopup={closePopup} />
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
          <AddGuest closePopup={closePopup} />
        </div>
      );
    default:
      return <div>Unknown category selected</div>;
  }
};

export default AddPopup;
