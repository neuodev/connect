import { Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../utils/socket';

const GroupsList = ({ group, children }) => {
  const { groupName, members, admin } = group;

  return (
    <div className='border py-2 px-3 mb-3 rounded-md shadow-sm '>
      <div className='flex items-center justify-between'>
        <p className='font-medium text-base mb-1'>{groupName} </p>
        {children}
      </div>
      <div className='flex items-center justify-start'>
        {members.map(({ member }, idx) => (
          <Tooltip title={member.username}>
            <img
              key={idx}
              className='-mr-2 border-indigo-50 border shadow-lg h-10 w-10 rounded-full'
              src={member.avatar}
              alt={member.username}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
