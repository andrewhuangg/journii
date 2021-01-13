import React from 'react';
import Moment from 'react-moment';
import Rating from '../layout/Rating';
import { Link } from 'react-router-dom';

const ReviewItem = ({ review: { comment, name, user, rating, createdAt } }) => {
  return (
    <>
      <div className='postShow__reviewItem'>
        <Rating value={rating} />
        <div className='postShow__reviewComment'>{comment}</div>
        <div className='postShow__reviewName'>{name}</div>
        <div className='postShow__reviewDate'>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
