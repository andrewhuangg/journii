import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserInfo, deleteAccount } from '../../actions/authAction';
import { setAlert } from '../../actions/alertAction';
import AlertMessage from '../layout/AlertMessage';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';

const UserProfile = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userDetails = useSelector((state) => state.auth.userShow);
  const { user, loading } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails('me')).then((data) => {
      setName(data.name);
      setEmail(data.email);
      user.image && user.image.length > 0
        ? setImage(user.image)
        : data.image && data.image.length > 0
        ? setImage(data.image)
        : setImage('');
    });
  }, [dispatch, user.image]);

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
    dispatch(updateUserInfo({ id: user._id, name, email, image })).then((data) => {
      if (data) dispatch(setAlert('user details updated', 'success'));
    });
  };

  const deleteAccountHandler = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be reversed!'
      )
    ) {
      dispatch(deleteAccount(id));
      setAlert('account deleted', 'success');
    }
  };

  const unsplashURL = 'https://source.unsplash.com/collection/289662/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${user.image && user.image.length > 0 ? user.image : unsplashImage})`,
  };

  return (
    <>
      {!loading ? (
        <div className='userProfile'>
          <Meta title='journii | Edit User' />
          <AlertMessage />
          <div className='userProfile__wrapper'>
            <form className='userProfile__form' onSubmit={submitHandler}>
              <h3>Personal</h3>
              <small>* = required field</small>
              <div className='userProfile__image' style={randomDefaultImage}></div>
              <div className='userProfile__form-control'>
                <input
                  className='userProfile__form-input'
                  type='text'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  className='userProfile__form-image-file'
                  id='image-file'
                  type='file'
                  onChange={uploadFileHandler}
                />
              </div>
              <div className='userProfile__form-control'>
                <input
                  className='userProfile__form-input'
                  placeholder='* Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='userProfile__form-control'>
                <input
                  className='userProfile__form-input'
                  placeholder='* Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className='userProfile__form-btn'>Update</button>
            </form>
            <div className='userProfile__cta'>
              <button
                className='userProfile__delete'
                onClick={() => deleteAccountHandler(user._id)}
              >
                Delete Account
              </button>
              <Link to='/updatepassword' className='userProfile__updatepassword-link'>
                Update Password
              </Link>
            </div>
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

export default UserProfile;
