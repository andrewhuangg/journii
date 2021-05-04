import axios from 'axios';
import React, { useState } from 'react';
import { setAlert } from '../../actions/alertAction';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/postAction';
import AlertMessage from '../layout/AlertMessage';
import Meta from '../layout/Meta';
import Spinner from '../layout/Spinner';

const CreatePost = ({ history }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

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
    if (title.length <= 99) {
      dispatch(createPost({ text, title, image })).then((data) => {
        setText('');
        setTitle('');
        if (data) history.push(`/posts/${data._id}`);
      });
    } else {
      dispatch(
        setAlert(
          'title may not contain more than 100 chars, please edit your post to continue',
          'error'
        )
      );
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
      <div className='createPost'>
        <Meta title='journii | Create A Post' />
        <AlertMessage />
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
                maxLength='100'
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
    </>
  );
};

export default CreatePost;
