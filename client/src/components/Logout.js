import { SettingsPower } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';

import { userLogout } from '../actions/user';
const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout());
  };
  return (
    <button
      onClick={logoutHandler}
      className='flex items-center space-x-1 text-red-800 bg-red-300 w-full  py-2 px-3 shadow-sm hover:shadow-md focus:outline-none font-medium text-sm'>
      <SettingsPower />
      Logout
    </button>
  );
};

export default Logout;
