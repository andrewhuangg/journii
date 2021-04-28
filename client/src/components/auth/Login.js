import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/authAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo, loading } = loginUser;

  useEffect(() => {
    wrapLabelsWithSpan();
  }, []);

  if (userInfo) return <Redirect to='/dashboard' />;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const wrapLabelsWithSpan = () => {
    const labels = document.querySelectorAll('.auth__form-control label');
    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split('')
        .map((char, idx) => `<span style="transition-delay:${idx * 50}ms">${char}</span>`)
        .join('');
    });
  };

  return (
    <>
      {!loading ? (
        <div className='auth'>
          <div className='auth__wrapper'>
            <Meta title='journii | Login' />
            <h1 className='auth__header'>Sign In</h1>
            <form onSubmit={submitHandler} className='auth__form'>
              <div className='auth__form-control'>
                <input
                  className='auth__input'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                />
                <label>Email</label>
              </div>

              <div className='auth__form-control'>
                <input
                  className='auth__input'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
                <label>Password</label>
              </div>

              <button className='auth__btn' type='submit'>
                Sign In
              </button>
              <p className='auth__redirect'>
                New User? <Link to='/register'>Register</Link>
              </p>
            </form>
            <Link to='/forgotpassword' className='auth__forgotpassword'>
              forgot password
            </Link>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Login;
