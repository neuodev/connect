import { IconButton, makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfilePicture, getUserById } from '../../actions/user';
import uploadPhoto from '../../utils/uploadProfilePhoto';
import Alert from '../utils/Alert';

const useStyle = makeStyles({
  input: {
    display: 'none',
  },
});
const SettingsHeader = () => {
  const { user } = useSelector(state => state.userLogin);
  const classes = useStyle();

  const dispatch = useDispatch();

  const uploadPhotoHandler = async e => {
    e.preventDefault();
    const filePath = await uploadPhoto(e.target.files[0] , user.userId);
    dispatch(changeProfilePicture(filePath));
    dispatch(getUserById(user.userId));
  };

  return (
    <div className='ml-4'>
      <h1 className='text-lg font-medium  text-gray-600 '>Settings</h1>
      {user.avatar && user.avatar.error && (
        <div className='mt-3 mr-3'>
          <Alert severity='error' message={user.avatar.error}></Alert>
        </div>
      )}
      <div className='flex flex-row justify-evenly  items-start  my-4 space-y-4'>
        <div className='relative mr-1'>
          <div>
            <div className='relative'>
              <img
                src={
                  user.avatar && !user.avatar.error
                    ? user.avatar
                    : '/images/hero.jpg'
                }
                className='w-32 h-32 shadow-lg rounded-full mb-4 object-cover  '
                alt=''
              />
              {/* update  photo  */}
              <div className='absolute right-1 -bottom-2'>
                <input
                  accept='image/*'
                  className={classes.input}
                  onChange={uploadPhotoHandler}
                  id='icon-button-file'
                  type='file'
                />
                <label htmlFor='icon-button-file'>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'>
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
          <h1 className='text-lg font-medium tracking-wider text-center  text-gray-800'>
            {user.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
