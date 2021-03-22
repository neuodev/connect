import { Search } from '@material-ui/icons';
import React from 'react';

import { useDispatch } from 'react-redux';
import { SEARCH_FRIENDS } from '../../actions/actionTypes';
import { getFriends } from '../../actions/user';
import { validateInput } from '../../utils/validateInput';

const ChatsHeader = () => {
  const dispatch = useDispatch();
  const handleChange = e => {
    const valid = validateInput(e.target.value);
    if (!valid) return;
    if (e.target.value) {
      const payload = new RegExp(e.target.value, 'i');
      dispatch({ type: SEARCH_FRIENDS, payload });
    } else {
      dispatch(getFriends());
    }
  };

  return (
    <div className='mx-auto'>
      <div className='flex  items-center py-3  px-4 text-gray-500 bg-gray-200 rounded-md  shadow-inner  '>
        <Search />
        <input
          type='text'
          placeholder='Search messages or usernames or emails '
          className='w-full bg-gray-200  text-sm  px-3  py-2 focus:outline-none '
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ChatsHeader;
