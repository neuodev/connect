import { Tooltip } from '@material-ui/core';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  HIDE_CHAT_SMALL_SCREEN,
  SET_ACTIVE_GROUP,
  SET_ACTIVE_USER,
} from '../actions/actionTypes';
import { removeFriend } from '../actions/user';
import socket from '../utils/socket';
const Head = () => {
  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  const { friends } = useSelector(state => state.friends);
  const { groups } = useSelector(state => state.getGroups);
  const {
    user: { userId },
  } = useSelector(state => state.userLogin);

  const findActiveUserInfo = friends.find(
    friend => friend.user._id === activeUser
  );
  const findActiveGroupInfo = groups.find(group => group._id === activeGroup);

  const dispatch = useDispatch();
  const chatBoxOut = () => {
    dispatch({ type: HIDE_CHAT_SMALL_SCREEN });
  };

  const removeFriendHandler = friendId => {
    dispatch(removeFriend(friendId));
    dispatch({ type: HIDE_CHAT_SMALL_SCREEN });
    dispatch({ type: SET_ACTIVE_USER, payload: '' });
  };

  const leaveRemoveHandler = groupId => {
    socket.emit('deleteGroup', { groupId, userId });
    dispatch({ type: HIDE_CHAT_SMALL_SCREEN });
    dispatch({ type: SET_ACTIVE_GROUP, payload: '' });
  };
  return (
    <div className='flex items-center justify-between   '>
      <div className='  w-full  px-1 flex items-center bg-gray-100  h-14 '>
        <div className='block md:hidden   '>
          <button
            className='border p-1 -pb-1 rounded-full focus:outline-none focus:ring-1 '
            onClick={chatBoxOut}>
            <BsArrowLeft />
          </button>
        </div>

        {findActiveUserInfo ? (
          <img
            src={findActiveUserInfo && findActiveUserInfo.user.avatar}
            className='w-10 h-10 object-cover rounded-full overflow-hidden inline-block flex-none  mx-2.5  '
            alt=''
          />
        ) : (
          <div className='mx-2 mr-6'>
            {findActiveGroupInfo &&
              findActiveGroupInfo.members.map(({ member }, idx) => (
                <Tooltip title={member.username}>
                  <img
                    src={findActiveGroupInfo && member.avatar}
                    className='w-10 h-10 object-cover rounded-full overflow-hidden inline-block flex-none -mr-3 ring-2 ring-indigo-200 shadow-lg'
                    alt=''
                  />
                </Tooltip>
              ))}
          </div>
        )}
        <div className=''>
          <h1 className='text-sm  font-medium tracking-wider text-gray-700'>
            {findActiveGroupInfo
              ? findActiveGroupInfo.groupName
              : findActiveUserInfo
              ? findActiveUserInfo.user.username
              : 'user name'}
          </h1>
        </div>
        <div className='ml-auto mr-4'>
          {findActiveUserInfo ? (
            <button
              onClick={() => removeFriendHandler(findActiveUserInfo.user._id)}
              className=' flex items-center space-x-1 border-red-200  text-xs uppercase 
            border-2 text-red-500 hover:bg-red-100   
            focus:outline-none  focus:ring-1 focus:ring-red-400 mr-2  px-2 py-1  rounded-full'>
              <i className='fa fa-trash ' aria-hidden='true'></i>
              <p>remove</p>
            </button>
          ) : (
            findActiveGroupInfo && (
              <button
                onClick={() => leaveRemoveHandler(findActiveGroupInfo._id)}
                className=' flex items-center space-x-1 border-red-200  text-xs uppercase 
            border-2 text-red-500 hover:bg-red-100   
            focus:outline-none  focus:ring-1 focus:ring-red-400 mr-2  px-2 py-1  rounded-full'>
                <i className='fa fa-trash ' aria-hidden='true'></i>
                <p>Leave</p>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
