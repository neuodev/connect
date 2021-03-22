import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socket from '../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../actions/user';
import { Forum } from '@material-ui/icons';
import Alert from './utils/Alert';
import { AiOutlineLock } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import Loading from './utils/Loading';
const Register = ({ history }) => {
  const { loading, user, error } = useSelector(state => state.userRegister);
  const [username, setUsername] = useState('Jone Doe');
  const [email, setEmail] = useState('jone@test.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage({ severity: 'error', text: 'All fields are required' });
      return;
    }
    dispatch(userRegister(username, email, password));
    setMessage({});
  };

  useEffect(() => {
    if (user && user.userId) {
      history.push('/login');
    }
  }, [user, history, dispatch]);
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
      <div className=' w-full sm:w-6/12 lg:w-4/12 xl:w-3/12 mx-4 '>
        <div className='text-center flex  flex-col items-center justify-center mb-5'>
          <Link to='/dashboard'>
            <div className='flex items-center space-x-2'>
              <Forum fontSize='large' className='text-indigo-500 text-5xl' />
              <h1 className='text-indigo-500 text-5xl font-bold tracking-wider'>
                Con
                <span className='text-indigo-200 font-medium'>nect</span>
              </h1>
            </div>
          </Link>
        </div>

        {message.severity && (
          <div className='mb-4'>
            <Alert severity={message.severity} message={message.text} />
          </div>
        )}
        {loading ? (
          <div className='my-7 text-center  flex items-center justify-center'>
            <Loading />
          </div>
        ) : error ? (
          <div className='my-7 '>
            <Alert severity='error' message={error} />
          </div>
        ) : (
          user &&
          user.userId&&(
            <div className='my-7'>
              <Alert
                severity='success'
                message='Account created successfully'
              />
            </div>
          )
        )}
        <form className='w-full' onSubmit={onSubmit}>
          <div className='flex flex-col space-y-1 mb-4'>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Full Name
            </label>
            <div className='flex  items-center  border rounded-md'>
              <div className='text-gray-400 p-2  text-sm px-5 border-r bg-gray-100 h-10 flex items-center justify-center rounded-l-md flex-none'>
                <FaRegUser />
              </div>
              <input
                type='text'
                placeholder='Name'
                value={username}
                onChange={e => setUsername(e.target.value)}
                className='py-2 px-3 flex-1 bg-gray-100    focus:outline-none focus:ring-1 focus:ring-gray-400 '
              />
            </div>
          </div>
          <div className='flex flex-col space-y-1 mb-4'>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Email
            </label>
            <div className='flex  items-center  border rounded-md'>
              <div className='text-gray-400 p-2  text-sm px-5 border-r bg-gray-100 h-10 flex items-center justify-center rounded-l-md flex-none'>
                <FaRegUser />
              </div>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type='text'
                placeholder='Email'
                className='py-2 px-3 flex-1 bg-gray-100    focus:outline-none focus:ring-1 focus:ring-gray-400 '
              />
            </div>
          </div>
          <div className='flex flex-col space-y-1 mb-4'>
            <div className='flex justify-between  items-center mb-1'>
              <label htmlFor='password' className='font-medium text-gray-700'>
                Password
              </label>
            </div>
            <div className='flex  items-center  border rounded-md'>
              <div className='text-gray-400 p-2  text-sm px-5 border-r bg-gray-100 h-10 flex items-center justify-center rounded-l-md flex-none'>
                <AiOutlineLock />
              </div>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
                placeholder='.....'
                className='py-2 px-3  w-full  focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>
          </div>

          <div className='mt-6'>
            <button className='w-full  bg-indigo-500 py-2 rounded-md shadow-md  text-lg font-medium uppercase text-white  hover:bg-indigo-600 focus:outline-none focus:ring-2'>
              Sign Up
            </button>
          </div>
        </form>
        <p className='text-gray-500 mt-4'>
          Have An Account ?{' '}
          <Link to='/login' className='text-indigo-500 font-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
