import React, { FC } from 'react';
import AddGuest from './AddGuest';
import './style.css';

interface Props {
  closePopup: () => void;
}

const AddPopup: FC<Props> = ({ closePopup }) => {
  return (
    <div className="addPopupContainer" onClick={() => closePopup()}>
      <div>
        <AddGuest closePopup={closePopup} />
      </div>
    </div>
  );
};

export default AddPopup;
