import React, { useState } from 'react';
import { forgotPassword } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import Meta from '../layout/Meta';

const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)).then(() => {
      setEmail('');
      history.push('/resetpassword');
    });
  };

  return (
    <>
      <div className='forgotpassword'>
        <Meta title='journii | Forgot Password' />
        <div className='forgotpassword__wrapper'>
          <h1 className='forgotpassword__header'>Forgot Password</h1>
          <form onSubmit={submitHandler} className='forgotpassword__form'>
            <div className='forgotpassword__form-control'>
              <input
                className='forgotpassword__input'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
            </div>
            <button className='forgotpassword__btn' type='submit'>
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
