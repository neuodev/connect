import React, { useState } from 'react';
import socket from '../utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { GrEmoji } from 'react-icons/gr';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
const MessageBox = () => {
  let [message, setMessage] = useState('');
  const { user } = useSelector(state => state.userLogin);
  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  const { friends } = useSelector(state => state.friends);
  const { groups } = useSelector(state => state.getGroups);
  const [showEmoji, setShowEmoji] = useState(false);

  const findActiveUserInfo = friends.find(
    friend => friend.user._id === activeUser
  );
  const findActiveGroupInfo = groups.find(group => group._id === activeGroup);

  document.addEventListener('click', e => {
    if (!e.target.closest('#emoji') && !e.target.closest('#emojiBtn')) {
      setShowEmoji(false);
    }
  });
  const addEmoji = emoji => {
    setMessage((message += emoji.native));
  };

  const onSubmit = e => {
    e.preventDefault();

    if (activeUser) {
      socket.emit('chatMessage', {
        text: message,
        userId: user.userId,
        friendId: activeUser,
        room: findActiveUserInfo.room,
      });
    } else if (activeGroup) {
      socket.emit('chatMessage', {
        text: message,
        userId: user.userId,
        groupId: activeGroup,
        room: findActiveGroupInfo.room,
      });
    }

    setMessage('');
  };

  return (
    <div className='px-4 py-4 border-t  flex  items-center  space-x-2  '>
      <form onSubmit={onSubmit} className=' w-full'>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          type='text'
          placeholder='Type Message'
          className='w-full border  py-2   px-4 rounded-full focus:outline-none focus:ring-2 '
        />
      </form>
      <div className='relative'>
        <button
          id='emojiBtn'
          className='focus:outline-none focus:ring-2  rounded-full text-xl text-blue-900 bg-blue-200 p-2'>
          <GrEmoji onClick={() => setShowEmoji(!showEmoji)} />
        </button>
        {showEmoji && (
          <div
            className='absolute bottom-9 -right-10 md:right-2 md:bottom-12  '
            id='emoji'>
            <Picker onSelect={addEmoji} />
          </div>
        )}
      </div>
      <button
        onClick={onSubmit}
        className='bg-blue-200  p-2 px-3  rounded-full text-blue-900 focus:outline-none focus:ring-2'>
        <i className='fa fa-paper-plane' aria-hidden='true'></i>
      </button>
    </div>
  );
};

export default MessageBox;
