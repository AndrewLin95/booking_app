import React from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
  return (
    <div className="servicesContainer">
      <div className="cardHeader">Services </div>
      <div className="cardSeparator"></div>
      <div className="cardMainContainer">
        <ServicesCard />
      </div>
    </div>
  );
};

export default Services;
