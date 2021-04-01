import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertMessage from '../layout/AlertMessage';
import Spinner from '../layout/Spinner';
import { createPostReview, listPostDetails } from '../../actions/postAction';

const CreateReview = ({ postId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!rating) {
      setMessage('rating cannot be empty');
    } else {
      dispatch(createPostReview(postId, { rating, comment })).then(() => {
        dispatch(listPostDetails(postId));
        setRating(0);
        setComment('');
      });
    }
  };

  return (
    <>
      <div className='review'>
        <form className='review__form' onSubmit={submitHandler}>
          <div className='review__rating-info'>
            <label className='review__rating'>Rating </label>
            <select
              className='review__select'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value=''>Select...</option>
              <option value='1'>1 - Poor</option>
              <option value='2'>2 - Fair</option>
              <option value='3'>3 - Good</option>
              <option value='4'>4 - Great</option>
              <option value='5'>5 - Execellent</option>
            </select>
          </div>
          <textarea
            className='review__textarea'
            placeholder='What are your thoughts...?'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className='review__form-btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReview;
