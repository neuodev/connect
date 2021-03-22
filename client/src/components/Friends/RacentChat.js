
import moment from 'moment';
import React, { useState } from 'react';
import './style.css'
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../../actions/user';
import {
  SET_ACTIVE_GROUP,
  SHOW_CHAT_SMALL_SCREEN,
} from '../../actions/actionTypes';

const RacentChats = ({ friend, children }) => {

  const { user, messages, room } = friend;
  const now = moment().format('h:mm a');
  const dispatch = useDispatch();
  const [time, setTime] = useState(now);

  const lastMessage = messages[messages.length - 1];
  const activeUserHandler = () => {
    dispatch(setActiveUser(user._id, room));
    dispatch({ type: SET_ACTIVE_GROUP, payload: '' });
    dispatch({ type: SHOW_CHAT_SMALL_SCREEN });
  };

  return (
    <div>
      <div className=''>
        <div
          className={`
            flex items-center p-3 w-full  rounded-md  duration-100  relative  shadow-md border hover:shadow-lg mb-3 transition-all `} id='chat-item'>
          <div className='relative'>
            <img
              onClick={activeUserHandler}
              src={user.avatar}
              alt={user.username}
              className='w-10 h-10 rounded-full  object-cover mr-3 cursor-pointer '
            />
          </div>
          <div className='w-10/12'>
            <div className='flex  justify-between items-center w-full'>
              <h1
                onClick={activeUserHandler}
                className='font-medium text-sm tracking-wider leading-tight text-gray-800  hover:text-indigo-500 cursor-pointer'>
                {user.username}
              </h1>
              <p className='text-xs text-gray-500 font-medium '>
                {messages.length === 0 ? time : lastMessage.time}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm text-gray-600'>
                {messages.length === 0
                  ? `Start chat with ${user.username}`
                  : lastMessage.text}
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacentChats;
