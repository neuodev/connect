import React from 'react';
import {
  RiUser2Line,
  RiGroupLine,
  RiContactsLine,
  RiSettings3Line,
} from 'react-icons/ri';
import { BiCommentDots } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { HIDE_CHAT_SMALL_SCREEN } from '../actions/actionTypes';
import { getGroups } from '../actions/group';

const useStyle = makeStyles({
  tooltip: {
    padding: '10px',
    fontSize: '13px',
  },
});

const sideBarList = [
  {
    toolTip: 'Profile',
    path: '/',
    icon: <RiUser2Line />,
    activeTap: 'profile',
  },
  {
    toolTip: 'Friends',
    path: '/friends',
    icon: <BiCommentDots />,
    activeTap: 'friends',
  },
  {
    toolTip: 'Groups',
    path: '/groups',
    icon: <RiGroupLine />,
    activeTap: 'groups',
  },

  {
    toolTip: 'Settings',
    path: '/settings',
    icon: <RiSettings3Line />,
    activeTap: 'settings',
  },
];
const Sidebar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const chatBoxOut = () => {
    dispatch({ type: HIDE_CHAT_SMALL_SCREEN });
    dispatch(getGroups());
  };
  return (
    <div
      className='flex flex-col justify-center items-center w-16 h-full text-xl bg-white text-gray-400 border-r pr-3 '
      // style={{ height: '807px' }}
    >
      {sideBarList.map(item => (
        <Tooltip
          title={item.toolTip}
          classes={{ tooltip: classes.tooltip }}
          placement='right'
          arrow
          interactive>
          <Link to={item.path}>
            <div
              onClick={chatBoxOut}
              className={` hover:bg-indigo-50  w-12 flex items-center justify-center py-3 mb-4 ml-2 rounded-md hover:text-indigo-500 ${'text-indigo-500 bg-indigo-50'}`}>
              {item.icon}
            </div>
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sidebar;
