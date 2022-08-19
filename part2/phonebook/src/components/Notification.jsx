import React from 'react';

const Notification = ({ message, status }) => {
  const className = `notification ${status}`;
  console.log(className);
  return <div className={className}>{message}</div>;
};

export default Notification;
