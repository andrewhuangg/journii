import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Rating from '../layout/Rating';

const PostItem = ({
  post: { _id, text, title, image, rating, numReviews, likes, comments, createdAt },
}) => {
  const unsplashURL = 'https://source.unsplash.com/collection/289662/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${image.length > 0 ? image : unsplashImage})`,
  };

  return (
    <>
      <Link to={`posts/${_id}`} className='postItem'>
        <div className='postItem__overlay'>
          <span>read more</span>
        </div>
        <div className='postItem__image' style={randomDefaultImage}></div>
        <div className='postItem__content'>
          <div className='postItem__title'>{title}</div>
          <div className='postItem__text'>{text}</div>
        </div>
        <div className='postItem__likes'>
          <i className='fas fa-heart' /> {likes.length > 0 && likes.length}
        </div>
        <div className='postItem__comments'>
          <i className='fas fa-comments' /> {comments.length > 0 && comments.length}
        </div>
        <div className='postItem__rating'>
          <Rating value={rating} text={`${numReviews}`} />
        </div>
        <div className='postItem__date'>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
        </div>
      </Link>
    </>
  );
};

export default PostItem;
