import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, listPostDetails, deletePost } from '../../actions/postAction';
import { Link } from 'react-router-dom';

const EditPost = ({ match }) => {
  const dispatch = useDispatch();
  const postId = match.params.id;

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const postDetails = useSelector((state) => state.posts.post);
  const { post, loading } = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(postId)).then((data) => {
      setText(data.text || '');
      setTitle(data.title || '');
      post.image && post.image.length > 0
        ? setImage(post.image)
        : data.image && data.image.length > 0
        ? setImage(data.image)
        : setImage('');
    });
  }, [dispatch, post.image]);

  const deleteHandler = (id) => {
    dispatch(deletePost(id)).then(() => {
      window.location.pathname = '/posts';
    });
  };

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
    dispatch(updatePost({ text, title, image }, post._id));
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
      {!loading && (
        <div className='editPost'>
          <div className='editPost__wrapper'>
            <form className='editPost__form' onSubmit={submitHandler}>
              <h3>Update Post</h3>
              <small>* = required field</small>

              {image && <div className='editPost__image' style={randomDefaultImage}></div>}

              <div className='editPost__form-control'>
                <input
                  className='editPost__form-input'
                  type='text'
                  value={image}
                  placeholder='Image File'
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  className='editPost__form-image-file'
                  id='image-file'
                  type='file'
                  onChange={uploadFileHandler}
                  accept='image/*,.pdf'
                />
              </div>

              <div className='editPost__form-control'>
                <input
                  className='editPost__form-input'
                  type='text'
                  value={title}
                  placeholder='* Title'
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className='editPost__form-control'>
                <textarea
                  className='editPost__form-textarea'
                  value={text}
                  placeholder='* Edit your post...'
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>

              <div>
                <button className='editPost__btn'>Update</button>
                <button className='editPost__delete' onClick={() => deleteHandler(post._id)}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
