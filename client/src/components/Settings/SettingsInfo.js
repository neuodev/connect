import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Alert from '../utils/Alert';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
// import './style.css';

import { updateuser, userLogout } from '../../actions/user';
import Loading from '../utils/Loading';
const useStyle = makeStyles({
  nested: {},
});
const SettingsInfo = () => {
  const { user } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const [expanded, setExpend] = useState(false);
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordMessage, setOldPasswordMessage] = useState(false);
  const [newPasswordMessage, setNewPasswordMessage] = useState(false);
  const [nameMessage, setNameMessage] = useState(false);
  const [emailMessage, setEmailMesage] = useState(false);
  const { error, loading, success } = useSelector(state => state.updateUser);
  const classes = useStyle();
  const handleChange = panel => (e, isExpanded) => {
    setExpend(isExpanded ? panel : false);
  };

  const onSubmitPersonalDetails = e => {
    e.preventDefault();
    if (!name) {
      setNameMessage('Name Is requried');
      setEmailMesage('');
      return;
    }
    if (!email) {
      setEmailMesage('Email is requried');
      setNameMessage('');
      return;
    }

    dispatch(updateuser({ username: name, email }));
  };
  const updatePassword = () => {
    if (!oldPassword) {
      setOldPasswordMessage('Old password is requried');
      setNewPasswordMessage('');
      return;
    }
    if (!newPassword) {
      setOldPasswordMessage('');
      setNewPasswordMessage('New password is requried');
      return;
    }

    dispatch(updateuser({ oldPassword, newPassword }));
  };

  const logoutHandler = () => {
    dispatch(userLogout());
  };
  return (
    <div className='w-11/12 mx-auto' style={{ height: '500px' }}>
      {loading ? (
        <div className='mb-6 flex items-center justify-center'>
          <Loading />
        </div>
      ) : error ? (
        <div className='mb-6'>
          <Alert severity='error' message={error}></Alert>
        </div>
      ) : (
        success && (
          <div className='mb-6'>
            <Alert severity='success' message='Updated Successfully'></Alert>
          </div>
        )
      )}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'>
          <Typography className={classes.heading}>General settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='ml-2 w-full'>
            <div className='my-4 '>
              <p className='text-sm mb-1 font-light'>Name</p>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Email'
                className='py-4 border rounded-lg  w-full  px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700 font-medium'
              />
              {nameMessage && (
                <p className='text-xs text-red-600 mt-0.5 '>*{nameMessage}</p>
              )}
            </div>
            <div className='my-4'>
              <p className='text-sm mb-1 font-light'>Email</p>
              <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                className='py-4 border rounded-lg  w-full  px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700 font-medium'
              />
              {emailMessage && (
                <p className='text-xs text-red-600 mt-0.5 '>*{emailMessage}</p>
              )}
            </div>

            <div className='ml-auto flex justify-end w-full'>
              <button
                onClick={onSubmitPersonalDetails}
                className='focus:outline-none flex space-x-1 items-center border-2 px-3 py-2 rounded-lg border-indigo-500  text-indigo-700 font-medium uppercase tracking-wider text-sm '
                variant='contained'
                color='primary'>
                <AiOutlineEdit /> <span> Update</span>
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* password  */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'>
          <Typography className={classes.heading}>Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='ml-2 w-full'>
            <h1 className='text-sm font-medium mb-2 tracking-wider'>
              Update Password
            </h1>
            <div className='my-4 '>
              <input
                type='text'
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder='Old Password'
                className='py-4 border rounded-lg  w-full  px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700 font-medium'
              />
              {oldPasswordMessage && (
                <p className='text-xs text-red-600 mt-0.5 '>
                  *{oldPasswordMessage}
                </p>
              )}
            </div>
            <div className='my-4'>
              <input
                type='text'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder='New Password'
                className='py-4 border rounded-lg  w-full  px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700 font-medium'
              />
              {newPasswordMessage && (
                <p className='text-xs text-red-600 mt-0.5 '>
                  *{newPasswordMessage}
                </p>
              )}
            </div>
            <div className='ml-auto flex justify-end w-full'>
              <button
                onClick={updatePassword}
                className='focus:outline-none flex space-x-1 items-center border-2 px-3 py-2 rounded-lg border-indigo-500  text-indigo-700 font-medium uppercase tracking-wider text-sm '
                variant='contained'
                color='primary'>
                <AiOutlineEdit /> <span> Update</span>
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <button
        className='mt-4  border border-red-200 rounded-md uppercase tracking-wider py-2 px-5 cursor-pointer text-red-800 font-medium shadow-md bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200'
        onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default SettingsInfo;
