import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPostComment, listPostDetails } from '../../actions/postAction';
import Spinner from '../layout/Spinner';

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      setMessage('comment cannot be empty');
    } else {
      setMessage(null);
      dispatch(createPostComment(postId, { text })).then(() => {
        dispatch(listPostDetails(postId));
        setText('');
      });
    }
  };

  return (
    <>
      <div className='comment container'>
        <div className='container'>
          <h6>Discussion</h6>
          <form className='comment__form' onSubmit={submitHandler}>
            <textarea
              className='comment__form-textarea'
              placeholder='The world is your playground...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength='2000'
            />
            <button className='comment__form-btn' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateComment;
