import React, { useEffect, useState } from 'react';
import socket from '../../utils/socket';
import GroupsHeader from '../Groups/GroupsHeader';
import GroupsList from '../Groups/GroupsList';
import { useSelector, useDispatch } from 'react-redux';
import NewGroup from '../Groups/NewGroup';
import { getGroups } from '../../actions/group';
import GroupUserSkeleton from '../Groups/GroupUserSkeleton';
import Alert from '../utils/Alert';
import Invite from '../Invite/Invite';
import {
  SET_ACTIVE_GROUP,
  SET_ACTIVE_USER,
  SHOW_CHAT_SMALL_SCREEN,
} from '../../actions/actionTypes';
const Groups = () => {
  const { user } = useSelector(state => state.userLogin);
  const { loading, error, groups } = useSelector(state => state.getGroups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const setActiveGroup = (groupId, room) => {
    dispatch({ type: SET_ACTIVE_GROUP, payload: groupId });
    dispatch({ type: SET_ACTIVE_USER, payload: '' });
    dispatch({ type: SHOW_CHAT_SMALL_SCREEN });
    socket.emit('joinRoomGroup', { room, groupId });
  };

  const {
    user: { userId },
  } = useSelector(state => state.userLogin);

  const leaveRemoveHandler = groupId => {
    socket.emit('deleteGroup', { groupId, userId });
  };
  return (
    <div className='py-6 px-'>
      <div className='flex items-center justify-between mb-3 px-3'>
        <h1 className='mb-3 text-lg font-medium  text-gray-500 px-3 '>
          Groups{' '}
        </h1>
        <NewGroup>
          <button className='font-medium py-2 px-3 bg-indigo-200 text-indigo-700  rounded-full text-xs focus:outline-none focus:ring '>
            Make Group
          </button>
        </NewGroup>
      </div>
      <div className='mx-3'>
        <GroupsHeader />
      </div>

      {loading ? (
        <div className='my-5'>
          <GroupUserSkeleton />
          <GroupUserSkeleton />
          <GroupUserSkeleton />
        </div>
      ) : error ? (
        <Alert severity='error' message={error} />
      ) : (
        groups && (
          <div
            className='mt-4 overflow-y-scroll   px-3 '
            style={{ maxHeight: '600px' }}
            id='scroll'>
            {groups.length == 0 ? (
              <div className='py-4 bg-yellow-200 rounded-md shadow-lg  px-4  mb-8  '>
                <p className='font-medium text-yellow-600  '>
                  Make New Groups by add More Friends
                </p>
                <Invite>
                  <button className='bg-yellow-300 py-2 px-3 rounded-full text-yellow-700 font-medium  my-2 shadow-lg focus:outline-none'>
                    Add Friends
                  </button>
                </Invite>
              </div>
            ) : (
              groups.map((group, idx) => (
                <div>
                  <GroupsList group={group} key={idx}>
                    <div>
                      <button
                        className='cursor-pointer bg-indigo-200 px-3 uppercase text-sm rounded-full py-1  mx-2 text-indigo-700 font-medium focus:ring focus:outline-none '
                        onClick={() => setActiveGroup(group._id, group.room)}>
                        Open
                      </button>
                      <button
                        className='cursor-pointer border-2  border-red-300 px-3 uppercase text-sm rounded-full py-1   text-red-500 font-medium
                      focus:outline-none focus:ring focus:ring-red-300
                      '
                        onClick={() => leaveRemoveHandler(group._id)}>
                        Leave
                      </button>
                    </div>
                  </GroupsList>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Groups;
