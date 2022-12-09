import React, { FC } from 'react';
import { ServicesInterface } from '../../util/models';
import ServicesCard from './ServicesCard';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleAddBtnClick: (category: string) => void;
  serviceState: ServicesInterface[];
  loading: boolean;
}

const Services: FC<Props> = ({ handleAddBtnClick, serviceState, loading }) => {
  // TODO: Loading Skeleton
  if (loading) {
    return null;
  }

  return (
    <div className="servicesContainer">
      <div className="cardHeader">Services </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        {Object.entries(serviceState).map(([key, value]) => {
          return <ServicesCard key={key} service={value} />;
        })}
      </div>
      <div className="addBtnContainer">
        <button className="addBtn" onClick={() => handleAddBtnClick('service')}>
          <AddIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Services;
