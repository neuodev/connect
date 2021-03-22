import React, { useEffect, useState } from 'react';
import ChatsHeader from '../Friends/ChatsHeader';
import RacentChats from '../Friends/RacentChat';
import socket from '../../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { getFriends, removeFriend } from '../../actions/user';
import Invite from '../Invite/Invite';
import './style.css';
import Loading from '../utils/Loading';
import Alert from '../utils/Alert';
import FriendSkeleton from '../Friends/FriendSkeleton';
const Friends = () => {
  const { friends, error, loading } = useSelector(state => state.friends);
  const {
    success: removeSuccess,
    error: removeError,
    loading: removeLoading,
  } = useSelector(state => state.removeFriend);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);
  const removeFriendHandler = friendId => {
    dispatch(removeFriend(friendId));
  };
  return (
    <div className='py-4 px-2'>
      <div className=''>
        <ChatsHeader />
      </div>
      <div className=''>
        <h1 className='text-xl text-gray-700 font-bold mt-4 tracking-wider mb-4 px-2'>
          Racent{' '}
        </h1>
        {removeLoading ? (
          <div className='flex items-center justify-center my-4'>
            <Loading />
          </div>
        ) : removeError ? (
          <div className='my-3'>
            <Alert severity='error' message={removeError} />
          </div>
        ) : (
          removeSuccess && (
            <div className='my-3 px-2'>
              <Alert severity='success' message='Deleted Successfully' />
            </div>
          )
        )}
        {loading === true ? (
          <div>
            <FriendSkeleton />
            <FriendSkeleton />
            <FriendSkeleton />
            <FriendSkeleton />
          </div>
        ) : friends.length === 0 ? (
          <div className='bg-yellow-200 py-4  rounded-md px-4 text-yellow-700 font-medium'>
            <h1>Have No Friends </h1>
            <Invite>
              <button className='focus:outline-none bg-yellow-300 py-2 px-3 rounded-full  my-3  shadow-md'>
                Add New Friends
              </button>
            </Invite>
          </div>
        ) : (
          <>
            <div
              className='overflow-y-scroll px-2 '
              style={{ maxHeight: '600px' }}
              id='scroll'>
              {friends.map(friend => (
                <RacentChats friend={friend}>
                  <button
                    onClick={() => removeFriendHandler(friend.user._id)}
                    className='text-xs uppercase
               text-gray-700 hover:text-red-500 border-b border-gray-500 hover:border-red-500 
               focus:outline-none'>
                    remove
                  </button>
                </RacentChats>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
