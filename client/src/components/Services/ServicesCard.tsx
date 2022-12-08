import React, { FC } from 'react';
import { ServicesInterface } from '../../util/models';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface Props {
  service: ServicesInterface;
}

const ServicesCard: FC<Props> = ({ service }) => {
  return (
    <div className="cardContainer">
      <div className="cardName">{service.serviceHeader}</div>
      <div className="cardDescription">
        <ArrowRightIcon />
        {service.serviceName} ${service.servicePrice}
      </div>
    </div>
  );
};

export default ServicesCard;
