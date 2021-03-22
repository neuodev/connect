import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import socket from '../utils/socket';
import './style.css';
const Body = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const scrollToBottom = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    socket.on('message', res => {
      if (res.messages) {
        setMessages(res.messages);
      }
    });
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    function scrollFunc() {
      const scroll =
        messagesEndRef.current.scrollHeight -
        messagesEndRef.current.clientHeight;
      messagesEndRef.current.scrollTo(0, scroll);
    }
    scrollFunc();
  });
  return (
    <div
      ref={messagesEndRef}
      className='w-full px-6  py-10 overflow-y-scroll  bg-white chat-box '
      id='scroll' >
      {messages.map((message, idx) => (
        <Message message={message} key={idx} />
      ))}
    </div>
  );
};

export default Body;
