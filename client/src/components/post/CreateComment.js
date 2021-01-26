import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPostComment } from '../../actions/postAction';
import AlertMessage from '../layout/AlertMessage';
import Spinner from '../layout/Spinner';

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);

  const postComment = useSelector((state) => state.postComment);
  const { loading: loadingCommentCreate, error: errorCommentCreate } = postComment;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      setMessage('comment cannot be empty');
    } else {
      setMessage(null);
      dispatch(createPostComment(postId, { text }));
      setText('');
    }
  };

  return (
    <>
      {errorCommentCreate && <AlertMessage variant='danger'>{errorCommentCreate}</AlertMessage>}
      {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
      {loadingCommentCreate && <Spinner />}
      <div className='comment container'>
        <div className='container'>
          <h6>Discussion</h6>
          <form className='comment__form' onSubmit={submitHandler}>
            <textarea
              className='comment__form-textarea'
              placeholder='The world is your playground...'
              value={text}
              onChange={(e) => setText(e.target.value)}
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
