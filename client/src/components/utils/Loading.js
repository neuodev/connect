import React from 'react';

const Loading = () => {
  return (
    <div className='w-5 h-5 bg-blue-400 rounded-full animate-ping '>
      <div className='w-5 h-5 bg-blue-400 rounded-full animate-ping '>
        {' '}
        <div className='w-5 h-5 bg-blue-400 rounded-full animate-ping '></div>
      </div>
    </div>
  );
};

export default Loading;
