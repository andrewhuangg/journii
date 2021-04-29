import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPostComment, listPostDetails } from '../../actions/postAction';
import { setAlert } from '../../actions/alertAction';

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);

  const alertMessage = useSelector((state) => state.common.alerts);
  const { alerts } = alertMessage;

  const submitHandler = (e) => {
    e.preventDefault();
    if (text.length <= 1999) {
      dispatch(createPostComment(postId, { text })).then(() => {
        setText('');
        dispatch(listPostDetails(postId));
      });
    } else {
      dispatch(setAlert('your comment cannot contain more than 2000 chars', 'error'));
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
              required
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
