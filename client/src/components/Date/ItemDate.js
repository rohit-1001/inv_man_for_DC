import React from 'react';

import './ItemDate.css';

const ItemDate = (props) => {
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();

  return (
      <div className='order-date'>{day}/{month}/{year}</div>
  );
};

export default ItemDate;
