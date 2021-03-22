import { Search } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH_GROUPS } from '../../actions/actionTypes';
import { getGroups } from '../../actions/group';
import { validateInput } from '../../utils/validateInput';

const GroupsHeader = () => {
  const dispatch = useDispatch();
  const handleChange = e => {
    const valid = validateInput(e.target.value);
    if (!valid) return;
    if (e.target.value) {
      const payload = new RegExp(e.target.value, 'i');
      dispatch({ type: SEARCH_GROUPS, payload });
    }else {
      dispatch(getGroups());
    }
  };
  return (
    <div className='flex  items-center py-3  px-4 text-gray-500 bg-gray-200 rounded-md  '>
      <Search />
      <input
        type='text'
        placeholder='Search  messages or members or gorups'
        className='w-full bg-gray-200  text-sm  px-3  py-2 focus:outline-none '
        onChange={handleChange}
      />
    </div>
  );
};

export default GroupsHeader;
