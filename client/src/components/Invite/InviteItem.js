import { Send } from '@material-ui/icons';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addFriend } from '../../actions/user';
const InviteItem = ({ user }) => {
  const { username, email, avatar } = user;

  const dispatch = useDispatch();
  const clickHandler = async userId => {
    dispatch(addFriend(userId));
  };
  return (
    <div>
      {
        <div className='flex items-center justify-between my-4 mx-0.5'>
          <img
            src={avatar}
            className='w-12 h-12 object-cover rounded-full  mr-2'
            alt={username}
          />
          <div className='mr-auto truncate'>
            <p className='font-medium text-sm'> {username}</p>
            <p className='text-gray-500 font-light text-sm truncate '>{email}</p>
          </div>
          <button
            className='flex items-center justify-between space-x-1 bg-indigo-50 uppercase text-xs  rounded-md px-3 py-2 text-indigo-800 font-medium focus:outline-none focus:ring-1 flex-none ml-1'
            onClick={() => clickHandler(user._id)}>
            <Send className='' />
            <span> Start talking</span>
          </button>
        </div>
      }
    </div>
  );
};

export default InviteItem;
