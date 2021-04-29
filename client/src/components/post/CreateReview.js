import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostReview, listPostDetails } from '../../actions/postAction';
import { setAlert } from '../../actions/alertAction';

const CreateReview = ({ postId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const alertMessage = useSelector((state) => state.common.alerts);
  const { alerts } = alertMessage;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPostReview(postId, { rating, comment })).then((data) => {
      if (data) {
        dispatch(listPostDetails(postId));
        setRating(0);
        setComment('');
      }
    });
  };

  // need to add rating selection to rating item

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
              required
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
