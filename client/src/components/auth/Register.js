import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/authAction';
import { setAlert } from '../../actions/alertAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import AlertMessage from '../layout/AlertMessage';

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo, loading } = loginUser;

  const wrapLabelsWithSpan = () => {
    const labels = document.querySelectorAll('.authRegister__form-control label');
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
      dispatch(setAlert('passwords do not match', 'error'));
    } else {
      dispatch(register({ name, email, password, image }));
    }
  };

  return (
    <>
      {!loading ? (
        <div className='authRegister'>
          <Meta title='journii | Register' />
          <AlertMessage />
          <div className='authRegister__wrapper'>
            <h1 className='authRegister__header'>Sign up</h1>
            <form onSubmit={submitHandler} className='authRegister__form'>
              <div className='authRegister__image'>
                <label>Upload Image</label>
                <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
                <input type='file' className='authRegister__file' onChange={uploadFileHandler} />
                {uploading && <Spinner />}
              </div>

              <div className='authRegister__form-control'>
                <input
                  className='authRegister__input'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  maxLength='30'
                  required
                />
                <label>Name</label>
              </div>

              <div className='authRegister__form-control'>
                <input
                  className='authRegister__input'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                />
                <label>Email</label>
              </div>

              <div className='authRegister__form-control'>
                <input
                  className='authRegister__input'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
                <label>Password</label>
              </div>

              <div className='authRegister__form-control'>
                <input
                  className='authRegister__input'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password'
                  required
                />
                <label>Confirm Password</label>
              </div>

              <button className='authRegister__btn' type='submit'>
                Register
              </button>
              <p className='authRegister__redirect'>
                Have an account? <Link to='/login'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default Register;
