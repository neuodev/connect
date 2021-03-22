import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../actions/user';
import { AiOutlineLock } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { Forum } from '@material-ui/icons';
import Loading from './utils/Loading';
import Alert from './utils/Alert';
const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(state => state.userLogin);
  const [email, setEmail] = useState('johntravolta@gmail.com');
  const [password, setPassword] = useState('123456');

  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (user && user.email) {
      history.push('/');
    }
  }, [user]);

  return (
    <div className='w-full h-screen flex-col flex items-center justify-center bg-gray-50'>
      <div className='text-center flex  flex-col items-center justify-center'>
        <Link to='/'>
          <div className='flex items-center space-x-2 mb-5'>
            <Forum fontSize='large' className='text-indigo-500' />
            <h1 className='text-indigo-500 text-5xl font-bold tracking-wider'>
              Con
              <span className='text-indigo-200 font-medium'>nect</span>
            </h1>
          </div>
        </Link>
      </div>
      <div className=' w-full sm:w-6/12 lg:w-4/12 xl:w-3/12 mx-4  '>
        {loading ? (
          <div className='my-7 text-center  flex items-center justify-center mx-4'>
            <Loading />
          </div>
        ) : error ? (
          <div className='my-7   mx-4'>
            <Alert severity='error' message={error} />
          </div>
        ) : (
          user &&
          user.userId && (
            <div className='my-7  mx-4'>
              <Alert
                severity='success'
                message='Account created successfully'
              />
            </div>
          )
        )}

        <form className='w-full px-4' onSubmit={onSubmit}>
          <div className='flex flex-col space-y-1 mb-4'>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Email
            </label>
            <div className='flex  items-center  border rounded-md'>
              <div className='text-gray-400 p-2  text-sm px-5 border-r bg-gray-100 h-10 flex items-center justify-center rounded-l-md flex-none'>
                <FaRegUser />
              </div>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                type='password'
                placeholder='.....'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='py-2 px-3  w-full  focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>
          </div>

          <div className='mt-3'>
            <button className='w-full  bg-indigo-500 py-2 rounded-md shadow-md  text-lg font-medium uppercase text-white  hover:bg-indigo-600 focus:outline-none focus:ring-2'>
              Sign in{' '}
            </button>
          </div>
        </form>
        <p className='text-gray-500 mt-4'>
          Have no Account ?{' '}
          <Link to='/register' className='text-indigo-500 font-medium'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
