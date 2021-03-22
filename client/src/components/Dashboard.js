import React, { useEffect } from 'react';
import Body from './Body';
import Head from './Head';
import MessageBox from './MessageBox';
import SideCol from './SideCol';
import socket from '../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import Navbar from './layouts/Navbar';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import Invite from './Invite/Invite';
import { getFriends } from '../actions/user';
import NewGroup from './Groups/NewGroup';
const Dashboard = ({ history }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.userLogin);
  useEffect(() => {
    if (!user || !user.userId) {
      history.push('/login');
    }
  }, [history, user]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect ot server.');
    });
    socket.emit('setUserToActive', {
      userId: user.userId,
      status: 'online',
    });
  }, [user]);

  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <div className='h-fulll h-screen ' id='screen'>
      <Navbar />
      <div className='flex h-full '>
        <Menu />
        <div className=' w-96 ' style={{ width: '600px' }}>
          <SideCol />
        </div>
        <div className=' w-full h-full hidden   md:block  '>
          {activeUser || activeGroup ? (
            <div className='h-full  relative border-l '>
              <Head />
              <Body />
              <div className='absolute left-0 bottom-1 w-full'>
                <MessageBox />
              </div>
            </div>
          ) : (
            <div className=' w-full rounded-tl-lg bg-indigo-200  flex items-center justify-center h-screen '>
              <div
                className='p-14
               bg-blue-300 rounded-lg shadow-xl text-blue-900 font-bold text-center text-lg'>
                <Link
                  to='/friends'
                  className='mb-4 inline-block bg-blue-400 px-4 py-2 rounded-full shadow-lg'>
                  Start Talk with Friends
                </Link>

                <p className='bg-blue-400 px-4 py-2 rounded-full cursor-pointer mb-4 shadow-lg'>
                  <Invite>Add New Friends</Invite>
                </p>
                <p className='bg-blue-400 px-4 py-2 rounded-full cursor-pointer shadow-lg'>
                  <NewGroup>Make New Group</NewGroup>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
