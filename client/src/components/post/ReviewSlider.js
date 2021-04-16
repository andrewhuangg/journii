import React, { useEffect, useState, useRef } from 'react';
import CreateReview from './CreateReview';
import ReviewItem from './ReviewItem';

const ReviewSlider = ({
  post: { _id, reviews },
  handleReviewSlider,
  userInfo,
  isOpen,
  sliderRef,
}) => {
  return (
    <nav className={`review__slider ${isOpen ? 'review__slider--active' : ''}`} ref={sliderRef}>
      <div
        className={`hamburger ${isOpen ? 'hamburger--active' : ''}`}
        id='hamburger'
        onClick={handleReviewSlider}
      ></div>
      <div className='review__slider-header'>
        <h6>Reviews ({reviews.length})</h6>
      </div>

      <CreateReview postId={_id} />

      <section className='reviews'>
        <div className='reviews__grid'>
          {reviews.map((rev) => (
            <ReviewItem key={rev._id} review={rev} postId={_id} userInfo={userInfo} />
          ))}
        </div>
      </section>
    </nav>
  );
};

export default ReviewSlider;
