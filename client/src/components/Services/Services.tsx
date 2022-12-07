import React from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
  return (
    <div className="servicesContainer">
      <div className="cardHeader">Services </div>
      <div className="cardSeparator"></div>
      <ServicesCard />
    </div>
  );
};

export default Services;
