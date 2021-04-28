import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import Meta from '../layout/Meta';

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updatePassword(currentPassword, newPassword)).then(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      });
    }
  };

  return (
    <>
      <div className='updatepassword'>
        <Meta title='journii | Update Password' />
        <div className='updatepassword__wrapper'>
          <h1 className='updatepassword__header'>Update Password</h1>
          <form className='updatepassword__form' onSubmit={submitHandler}>
            <div className='updatepassword__form-control'>
              <input
                className='updatepassword__input'
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='current password'
                required
              />
            </div>
            <div className='updatepassword__form-control'>
              <input
                className='updatepassword__input'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='new password'
                required
              />
            </div>
            <div className='updatepassword__form-control'>
              <input
                className='updatepassword__input'
                type='password'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder='confirm new password'
                required
              />
            </div>
            <button className='updatepassword__btn' type='submit'>
              Update Password
            </button>
          </form>
          <Link to='/userinfo' className='updatepassword__updateprofile-link'>
            Update User
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
