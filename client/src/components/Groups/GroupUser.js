import React from 'react';

const GroupUser = ({ friend, children }) => {
  const { username, email } = friend;
  return (
    <div>
      {
        <div className='flex items-center justify-between my-4 mx-0.5'>
          <img
            src={'/images/avatar-10.jpg'}
            className='w-12 h-12 object-cover rounded-full  mr-2'
            alt={username}
          />
          <div className='mr-auto'>
            <p className='font-medium text-sm'> {username}</p>
            <p className='text-gray-500 font-light text-sm'>{email}</p>
          </div>
          {children}
        </div>
      }
    </div>
  );
};

export default GroupUser;
