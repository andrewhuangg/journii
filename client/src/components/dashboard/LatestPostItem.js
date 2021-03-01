import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Rating from '../layout/Rating';

const LatestPostItem = ({
  post: { title, image, _id, createdAt, name, rating, likes, reviews },
}) => {
  const unsplashURL = 'https://source.unsplash.com/collection/1911873/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 600;
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
    <Link to={`posts/${_id}`}>
      <div className='dashboard__item'>
        <div className='dashboard__image' style={randomDefaultImage} />
        <div className='dashboard__text'>
          <div className='dashboard__author'>By: {name}</div>
          <div className='dashboard__title'>{title}</div>
        </div>
        <div className='dashboard__stats'>
          <i className='fas fa-heart'>
            &nbsp;
            {likes.length}
          </i>
          <span className='dashboard__spacer' />
          <Rating value={rating} />
          &nbsp;
          <p>({reviews.length})</p>
          <span className='dashboard__spacer' />
          <Moment format='MM/DD/YYYY' className='dashboard__date'>
            {createdAt}
          </Moment>
        </div>
      </div>
    </Link>
  );
};

export default LatestPostItem;
