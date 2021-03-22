import React from 'react';
import { useSelector } from 'react-redux';
const Message = ({ message }) => {
  const { user } = useSelector(state => state.userLogin);
  const { time, sender, receiver, text } = message;

  return (
    <div
      className={`mb-4 flex items-center ${
        user.userId === sender._id ? 'justify-end text-right' : 'justify-start'
      } justify-start `}>
      <div>
        <span
          className={` inline-block py-3 px-4 rounded-full font-medium ${
            user.userId === sender._id
              ? 'rounded-br-none bg-indigo-600 text-white'
              : ' rounded-bl-none bg-gray-100'
          }  border-gray-100 border `}>
          {text}
        </span>
        <p className='text-xs -mb-1'>{time}</p>
        {user.userId !== sender._id && (
          <p className='font-sans text-gray-700 text-sm font-medium mt-1'>
            {sender.username}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
