import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Body from './Body';
import Head from './Head';
import MessageBox from './MessageBox';
import Friends from './SideCol/Friends';
import Groups from './SideCol/Groups';
import Profile from './SideCol/Profile';
import Settings from './SideCol/Settings';
import { useSelector } from 'react-redux';
import './style.css';
const SideCol = () => {
  const { chatOnSmallScreen } = useSelector(state => state.layouts);
  return (
    <div className='  border-r relative '>
      <div
        className={`${
          chatOnSmallScreen ? 'showChatBox' : ' hideChatBox '
        }  block md:hidden absolute top-0  h-full w-full z-40  `}>
        <Head />
        <Body />
        <MessageBox />
      </div>
      <div className=' '>
        <Switch>
          <Route path='/' exact component={Profile} />
          <Route path='/friends' exact component={Friends} />
          <Route path='/groups' exact component={Groups} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </div>
  );
};

export default SideCol;
