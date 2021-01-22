import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_CREATE_REVIEW_RESET } from '../../actions/types';
import AlertMessage from '../layout/AlertMessage';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { createPostReview } from '../../actions/postAction';

const CreateReview = ({ postId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postReview = useSelector((state) => state.postReview);
  const { loading: loadingReviewCreate, error: errorReviewCreate } = postReview;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPostReview(postId, {
        rating,
        comment,
      })
    );
    setRating(0);
    setComment('');
    dispatch({ type: POST_CREATE_REVIEW_RESET });
  };

  return (
    <>
      {userInfo ? (
        <div className='review'>
          {errorReviewCreate && <AlertMessage variant='danger'>{errorReviewCreate}</AlertMessage>}
          {loadingReviewCreate && <Spinner />}
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
      ) : (
        <AlertMessage>
          Please <Link to='login'> Sign in </Link> to leave a review
        </AlertMessage>
      )}
    </>
  );
};

export default CreateReview;
