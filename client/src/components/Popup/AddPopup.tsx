import React, { FC } from 'react';
import AddGuest from './AddGuest';
import './style.css';

interface Props {
  closePopup: () => void;
}

const AddPopup: FC<Props> = ({ closePopup }) => {
  return (
    <div className="addPopupContainer">
      <AddGuest closePopup={closePopup} />
    </div>
  );
};

export default AddPopup;
