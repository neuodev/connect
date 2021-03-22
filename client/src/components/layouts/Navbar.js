import React from 'react';
import { Link } from 'react-router-dom';
import { Forum, PersonAdd, SettingsPower } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import Invite from '../Invite/Invite';

import Logout from '../Logout';
import { useState } from 'react';
const Navbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {
    user: { avatar },
  } = useSelector(state => state.userLogin);
  document.addEventListener('click', e => {
    if (!e.target.closest('#dropdown')) {
      setShow(false);
    }
  });

  return (
    <>
      <div className='px-4 py-3 border-b'>
        <div className='bg-white'>
          <div className='flex justify-between  items-center w-full '>
            <Link to='/'>
              <div className='flex items-center space-x-2'>
                <Forum className='text-indigo-500 text-4xl' />
                <h1 className='text-indigo-500 text-3xl font-bold tracking-wider'>
                  Con
                  <span className='text-indigo-200 font-medium'>nect</span>
                </h1>
              </div>
            </Link>
            <div className='relative ' id='dropdown'>
              <img
                onClick={() => setShow(!show)}
                className='cursor-pointer w-8 h-8 rounded-full inline-block shadow-lg ring-2'
                src={avatar}
                alt='username'
              />
              <ul
                className={`absolute z-50 top-9 right-0 transition-all duration-300  ${
                  show ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                } bg-white w-48  rounded-lg overflow-hidden shadow-lg border`}>
                <li>
                  <Invite>
                    {' '}
                    <button
                      className={`${
                        show ? 'block' : 'hidden'
                      } font-medium focus:outline-none  py-2 px-2 bg-indigo-200 text-indigo-700 w-full text-left `}>
                      <PersonAdd className='mr-1 ' />
                      Add Friends
                    </button>
                  </Invite>
                </li>
                <li className={`${show ? 'block' : 'hidden'}`}>
                  <Logout />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
