import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Rating from '../layout/Rating';

const PostItem = ({
  post: { _id, text, title, image, rating, numReviews, likes, createdAt, name },
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
      <Link to={`posts/${_id}`} className='post-item'>
        <div className='post-item__overlay'>
          <span>read more</span>
        </div>
        <div className='post-item__image' style={randomDefaultImage}></div>
        <div className='post-item__content'>
          <div className='post-item__title'>{title}</div>
          <div className='post-item__text'>{text}</div>
        </div>
        <div className='post-item__stats'>
          <div className='post-item__like'>
            <i className='fas fa-heart' /> {likes.length > 0 && likes.length}
          </div>
          <Rating value={rating} text={`${numReviews}`} />
        </div>
        <div className='post-item__date'>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
        </div>
      </Link>
    </>
  );
};

export default PostItem;
