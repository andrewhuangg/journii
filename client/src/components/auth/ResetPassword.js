import React, { useState } from 'react';
import { resetPassword } from '../../actions/authAction';
import { setAlert } from '../../actions/alertAction';
import { useDispatch } from 'react-redux';
import Meta from '../layout/Meta';
import AlertMessage from '../layout/AlertMessage';

const ResetPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setAlert('passwords do not match', 'error'));
    } else {
      dispatch(resetPassword(password, resetToken)).then(() => {
        dispatch(setAlert('reset password success', 'success'));
        history.push('/login');
      });
    }
  };
  return (
    <>
      <div className='resetpassword'>
        <Meta title='journii | Reset Password' />
        <AlertMessage />
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
