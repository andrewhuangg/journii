import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../actions/postAction';
import { POST_CREATE_RESET } from '../../actions/types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const CreatePost = ({ history }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

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
    if (!text) {
      setMessage('post cannot be empty');
    } else {
      setMessage(null);
      dispatch(createPost({ text, title, image })).then((data) => {
        setText('');
        setTitle('');
        history.push(`/posts/${data._id}`);
      });
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
    backgroundImage: `url(${image ? image : unsplashImage})`,
  };

  return (
    <>
      {userInfo ? (
        <div className='createPost'>
          <div className='createPost__wrapper'>
            <form className='createPost__form' onSubmit={submitHandler}>
              <h3>Share your thoughts...</h3>
              <small>* = required field</small>
              {image && <div className='createPost__image' style={randomDefaultImage}></div>}
              <div className='createPost__form-control'>
                <input
                  className='createPost__form-input'
                  type='text'
                  value={image}
                  placeholder='Image File'
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  className='createPost__form-image-file'
                  id='image-file'
                  type='file'
                  onChange={uploadFileHandler}
                  accept='image/*,.pdf'
                />
                {uploading && <Spinner />}
              </div>
              <div className='createPost__form-control'>
                <input
                  className='createPost__form-input'
                  type='text'
                  value={title}
                  placeholder='* Title'
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='createPost__form-control'>
                <textarea
                  className='createPost__form-textarea'
                  value={text}
                  placeholder='* Write your post...'
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <button className='createPost__btn'>Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <AlertMessage>
          Please <Link to='login'>Sign in</Link> to leave a post
        </AlertMessage>
      )}
    </>
  );
};

export default CreatePost;
