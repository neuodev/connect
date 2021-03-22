import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import socket from '../../utils/socket';

import InviteItemSkeleton from '../Invite/InviteItemSkeleton';
import { useSelector } from 'react-redux';
import GroupUser from './GroupUser';
import Alert from '../utils/Alert';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ children }) {
  const classes = useStyles();
  const { friends, loading, error } = useSelector(state => state.friends);
  const { user } = useSelector(state => state.userLogin);
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [message, setMessage] = useState({});
  const updateMembers = friend => {
    const { username, _id } = friend;
    const isExist = groupMembers.find(member => member.friendId === friend._id);
    if (isExist) {
      setMessage({ error: true, text: 'Already Added' });
      return;
    }

    setGroupMembers([...groupMembers, { username, friendId: _id }]);
  };
  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createGroupHandler = () => {
    if (!groupName) {
      setMessage({ error: true, text: 'Group name is required' });
      return;
    }
    if (groupMembers.length === 0) {
      setMessage({ error: true, text: 'Select at least one member' });
      return;
    }
    socket.emit('createGroup', { admin: user.userId, groupMembers, groupName });
    socket.on('createGroupResponse', res => {
      if (res.success) {
        setMessage({ success: true, text: 'Group Created Successfully' });
        setOpen(false);
      } else {
        setMessage({ error: true, text: res.error });
      }
    });
  };
  const removeMember = friend => {
    const { username, _id } = friend;
    const newMembers = groupMembers.filter(
      member => member.friendId === friend._id
    );

    setGroupMembers(newMembers);
  };
  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className='bg-white w-96 py-6 px-4 rounded-md  shadow-lg'>
            <div>
              <div className='mb-2'>
                {message.success ? (
                  <Alert severity='success' message={message.text} />
                ) : (
                  message.error && (
                    <Alert severity='error' message={message.text} />
                  )
                )}
              </div>
              <div className='px-3'>
                <div>
                  <label
                    htmlFor='groupName'
                    className='text-sm font-medium mb-1 block text-gray-500'>
                    Group Name
                  </label>
                  <input
                    type='text'
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    className='border w-full py-3 rounded-md focus:outline-none px-4 inline-block'
                  />
                </div>
                <div className='mt-2'>
                  <p className='font-medium text-sm text-gray-500 mb-1'>
                    Goup Members:{' '}
                  </p>
                  <p className='text-sm font-semibold'>
                    {groupMembers.map((member, idx) => {
                      if (idx === groupMembers.length - 1) {
                        return <span className='mr-1'>{member.username} </span>;
                      } else {
                        return (
                          <span className='mr-0.5'>{member.username}, </span>
                        );
                      }
                    })}
                  </p>
                </div>
              </div>
              {friends.length === 0 && loading === false && (
                <div className='py-4 px-4 my-5 bg-yellow-100 rounded-md font-medium uppercase text-yellow-900 tracking-wider'>
                  <h1>Add Friends First</h1>
                </div>
              )}
              {loading ? (
                <InviteItemSkeleton />
              ) : (
                <div
                  className='overflow-y-scroll py-2'
                  style={{ maxHeight: '400px' }}
                  id='scroll'>
                  {friends.map((friend, idx) => (
                    <GroupUser key={idx} friend={friend.user}>
                      <button
                        onClick={() => updateMembers(friend.user)}
                        className='flex items-center justify-between space-x-1 bg-indigo-50 uppercase text-xs  rounded-md px-3 py-2 text-indigo-800 font-medium focus:outline-none focus:ring-1'>
                        ADD
                      </button>
                      <button
                        onClick={() => removeMember(friend.user)}
                        className='flex items-center justify-between space-x-1 bg-red-200 uppercase text-xs  rounded-md px-3 py-2 text-red-800 font-medium focus:outline-none focus:ring-1 ml-1'>
                        Remove
                      </button>
                    </GroupUser>
                  ))}
                </div>
              )}

              <button
                onClick={createGroupHandler}
                className='w-full bg-indigo-200 py-3 rounded-md  text-indigo-700 uppercase tracking-wider font-medium focus:outline-none focus:ring'>
                Create The Group
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
