import React from 'react';
import Moment from 'react-moment';
import Rating from '../layout/Rating';
import { Link } from 'react-router-dom';

const ReviewItem = ({
  postId,
  deleteReviewHandler,
  userInfo,
  review: { _id, comment, name, user, rating, createdAt },
}) => {
  return (
    <>
      <div className='reviews__grid-item'>
        <div className='reviews__header'>
          <Link to={`/profile/${user}`} className='reviews__name'>
            {name}
          </Link>
          <span className='reviews__line-break'></span>
          <Moment format='MM/DD/YYYY' className='reviews__date'>
            {createdAt}
          </Moment>
          <span className='reviews__line-break'></span>
          <Rating value={rating} />
        </div>
        <div className='reviews__grid-comment'>{comment}</div>
        {userInfo.id === user && (
          <button className='reviews__delete-btn' onClick={() => deleteReviewHandler(postId, _id)}>
            <i className='fas fa-trash'></i>
          </button>
        )}
      </div>
    </>
  );
};

export default ReviewItem;
