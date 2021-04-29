import React, { useState } from 'react';
import { resetPassword } from '../../actions/authAction';
import { setAlert } from '../../actions/alertAction';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../layout/Meta';

const ResetPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const alertMessage = useSelector((state) => state.common.alerts);
  const { alerts } = alertMessage;

  // check to remove alerts before going to production

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setAlert('passwords do not match', 'error'));
    } else {
      dispatch(resetPassword(password, resetToken)).then(() => {
        if (alerts.length < 1) history.push('/login');
      });
    }
  };
  return (
    <>
      <div className='resetpassword'>
        <Meta title='journii | Reset Password' />
        <div className='resetpassword__wrapper'>
          <h1 className='resetpassword__header'>Reset Password</h1>
          <form onSubmit={submitHandler} className='resetpassword__form'>
            <div className='resetpassword__form-control'>
              <input
                className='resetpassword__input'
                type='text'
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder='reset token'
                required
              />
            </div>
            <div className='resetpassword__form-control'>
              <input
                className='resetpassword__input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required
              />
            </div>
            <div className='resetpassword__form-control'>
              <input
                className='resetpassword__input'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='confirm password'
                required
              />
            </div>
            <button className='resetpassword__btn' type='submit'>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
