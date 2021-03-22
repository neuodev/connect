import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { useSelector } from 'react-redux';
import socket from '../../utils/socket';

const Profile = () => {
  const { user } = useSelector(state => state.userLogin);
  const [status, setStatus] = useState('');
  useEffect(() => {
    socket.emit('getUserStatus', user.userId);
    socket.on('userStatus', status => {
      setStatus(status);
    });
  }, [user, socket]);
  return (
    <div className=' h-full' id='scroll'>
      <h1 className='text-xl text-gray-700  font-medium  mx-8 mt-4 '>
        My Profile{' '}
      </h1>
      <div className='w-full flex items-center justify-center text-center'>
        <div>
          <img
            className='h-32 w-32 rounded-full object-cover overflow-hidden border-2   shadow-md  mb-4 '
            src={user.avatar ? user.avatar : '/images/hero.jpg'}
            alt='username'
          />
          <h1 className='text-xl  font-medium tracking-wider mb-1 '>
            {user.username}
          </h1>
          {user.status === 'online' ? (
            <div className='flex  items-center  justify-center'>
              <div className='bg-green-400 w-2 h-2 rounded-full m-1 mr-3 animate-bounce '></div>
              <p className='font-medium text-sm tracking-wide'>Active</p>
            </div>
          ) : (
            <div className='flex  items-center  justify-center'>
              <div className='bg-red-400 w-2 h-2 rounded-full m-1 mr-3 animate-bounce '></div>
              <p className='font-medium text-sm tracking-wide'>Busy</p>
            </div>
          )}
        </div>
      </div>

      <div className='w-full flex flex-col space-y-1 items-center ml-0 p-8 mt-8'>
        <div className='flex items-center'>
          <PermIdentityIcon className='mr-2' />
          <Typography variant='h5'>
            <p className='font-medium text-lg'>About</p>
          </Typography>
        </div>

        <div className='w-full'>
          <div className='mb-7'>
            <h1 className='text-gray-400 text-sm font-medium'>Username</h1>
            <h1 className='text-lg '>{user.username}</h1>
          </div>
          <div className='mb-7'>
            <h1 className='text-gray-400 text-sm font-medium'>Email</h1>
            <h1 className='text-lg '>{user.email}</h1>
          </div>
          <div className='flex items-center justify-between '>
            <div>
              <h1 className='text-gray-400 text-sm font-medium'>Password</h1>
              <h1 className='text-lg '>*********</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
