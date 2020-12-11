import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/authAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/dashboard';

  useEffect(() => {
    if (userInfo) history.push(redirect);
    wrapLabelsWithSpan();
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
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
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {loading && <Spinner />}
      <div className='auth'>
        <div className='auth__wrapper'>
          <h1 className='auth__header'>Sign up</h1>
          <form onSubmit={submitHandler} className='auth__form'>
            <div className='auth__form-control'>
              <input
                className='auth__input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                required
              />
              <label>Name</label>
            </div>

            <div className='auth__form-control'>
              <input
                className='auth__input'
                type='text'
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

            <div className='auth__form-control'>
              <input
                className='auth__input'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                required
              />
              <label>Confirm Password</label>
            </div>

            <button className='auth__btn' type='submit'>
              Register
            </button>
            <p className='auth__redirect'>
              Have an account?{' '}
              <Link to={redirect ? `/login` : `/register?redirect=${redirect}`}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
