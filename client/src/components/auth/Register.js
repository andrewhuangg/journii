import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/authAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo, loading } = loginUser;

  const wrapLabelsWithSpan = () => {
    const labels = document.querySelectorAll('.auth__form-control label');
    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split('')
        .map((char, idx) => `<span style="transition-delay:${idx * 50}ms">${char}</span>`)
        .join('');
    });
  };

  useEffect(() => {
    wrapLabelsWithSpan();
  }, []);

  if (userInfo) return <Redirect to='/createprofile' />;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register({ name, email, password, image }));
    }
  };

  return (
    <>
      {!loading ? (
        <div className='auth'>
          <Meta title='journii | Register' />
          <div className='auth__wrapper'>
            <h1 className='auth__header'>Sign up</h1>
            <form onSubmit={submitHandler} className='auth__form'>
              <div className='auth__image'>
                <label>Image</label>
                <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
                <input type='file' className='auth__file' onChange={uploadFileHandler} />
                {uploading && <Spinner />}
              </div>

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
                Have an account? <Link to='/login'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Register;
