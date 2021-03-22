import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { SearchOutlined } from '@material-ui/icons';
import InviteItem from './InviteItem';
import socket from '../../utils/socket';
import { useSelector } from 'react-redux';
import InviteItemSkeleton from './InviteItemSkeleton';
import Loading from '../utils/Loading';
import Alert from '../utils/Alert';
import { validateInput } from '../../utils/validateInput';
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
  const { loading, error, success } = useSelector(state => state.addFriend);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState({
    loading: true,
    users: [],
    error: false,
    count: 0,
  });
  const handleOpen = async () => {
    setOpen(true);
    socket.emit('getUsers');
    socket.on('getUsersResponse', data => {
      setUsers({
        error: false,
        count: data.count,
        users: data.users,
        loading: false,
      });
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = e => {
    const isValid = validateInput(e.target.value);
    if (!isValid) return;
    if (e.target.value) {
      const regExp = new RegExp(e.target.value, 'i');
      const filteredUsers = users.users.filter(
        user => regExp.test(user.email) || regExp.test(user.username)
      );

      setUsers({
        error: false,
        count: filteredUsers.length,
        users: filteredUsers,
        loading: false,
      });
    } else {
      handleOpen();
    }
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
          <div
            className='bg-white w-96 py-6 px-4 rounded-md  shadow-lg mx-4 '
            style={{ width: '500px' }}>
            <div className='flex items-center space-x-2 border rounded-md px-3 py-4 mb-4 '>
              <SearchOutlined className='text-gray-500' />
              <input
                type='text'
                placeholder='Enter Username or Email...'
                className='w-full  focus:outline-none text-gray-700 '
                onChange={e => onChange(e)}
              />
            </div>
            {users.users.length === 0 && users.loading === false && (
              <div className='py-4 px-4 bg-yellow-100 rounded-md font-medium uppercase text-yellow-900 tracking-wider'>
                <h1>User not found</h1>
              </div>
            )}
            {users.loading ? (
              <InviteItemSkeleton />
            ) : (
              <div>
                {loading ? (
                  <div className='flex items-center justify-center mt-7'>
                    <Loading />
                  </div>
                ) : error ? (
                  <div className='mb-7'>
                    <Alert severity='error' message={error} />
                  </div>
                ) : (
                  success && (
                    <div className='mb-7'>
                      <Alert severity='success' message='Added Successfully' />
                    </div>
                  )
                )}
                <div
                  className='overflow-y-scroll py-2'
                  style={{ maxHeight: '400px' }}
                  id='scroll'>
                  {users.users.map(user => (
                    <InviteItem user={user} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
