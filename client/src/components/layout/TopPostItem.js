import React from 'react';
import { Link } from 'react-router-dom';

const TopPostItem = ({ post: { _id, title, name, text, image } }) => {
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
      <div className='post__item'>
        <div className='post__image' style={randomDefaultImage}></div>
        <div className='post__text'>
          <div className='post__author'>By {name}</div>
          <div className='post__title'>{title}</div>
          <div className='post__description'>{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default TopPostItem;
