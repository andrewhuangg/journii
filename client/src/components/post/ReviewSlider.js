import React from 'react';
import CreateReview from './CreateReview';
import ReviewItem from './ReviewItem';

const ReviewSlider = ({
  post: { _id, reviews },
  handleReviewSlider,
  deleteReviewHandler,
  userInfo,
  sliderRef,
}) => {
  return (
    <nav className='review__slider' id='review__slider' ref={sliderRef}>
      <div
        className='hamburger hamburger--active'
        id='hamburger'
        onClick={handleReviewSlider}
      ></div>
      <div className='review__slider-header'>
        <h6>Reviews ({reviews && reviews.length})</h6>
      </div>

      <CreateReview postId={_id} />

      <section className='reviews'>
        <div className='reviews__grid'>
          {reviews &&
            reviews.map((rev) => (
              <ReviewItem
                key={rev._id}
                review={rev}
                postId={_id}
                deleteReviewHandler={deleteReviewHandler}
                userInfo={userInfo}
              />
            ))}
        </div>
      </section>
    </nav>
  );
};

export default ReviewSlider;
