import React from 'react';

const Alert = ({ severity, message }) => {
  return (
    <div
      className={`${
        severity === 'error'
          ? 'bg-red-200 text-red-800'
          : severity === 'success'
          ? 'bg-green-200 text-green-800'
          : 'bg-blue-200 text-blue-800'
      } py-4 px-3 rounded-md uppercase tracking-wider text-sm`}>
      <p className='font-medium '>{message}</p>
    </div>
  );
};

export default Alert;
