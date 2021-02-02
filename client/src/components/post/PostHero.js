import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostHero = ({
  post,
  post: { _id, title, user, name, createdAt, image, follows },
  handleReviewSlider,
  deleteHandler,
  userInfo,
  postFollowHandler,
  postUnfollowHandler,
}) => {
  const renderFollowButton = () => {
    if (user && user._id !== userInfo.id) {
      return follows.map((follow) => follow.user).includes(userInfo.id) ? (
        <button className='post-hero__follow-btn' onClick={() => postUnfollowHandler(post, _id)}>
          Unfollow
        </button>
      ) : (
        <button className='post-hero__follow-btn' onClick={() => postFollowHandler(post, _id)}>
          Follow
        </button>
      );
    }
  };

  // Random Photo Generator
  const unsplashURL = 'https://source.unsplash.com/collection/289662/';
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  // Random Photo Generator
  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${image ? image : unsplashImage})`,
  };
  return (
    <section className='post-hero container'>
      <div className='container'>
        <div className='post-hero__image' style={randomDefaultImage}></div>
        <div className='post-hero__header container--pall'>
          <h1>{title}</h1>
          <p>
            Publisher <Link to={`profiles/${user && user._id}`}>{name}</Link>
          </p>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
          <div className='post-hero__cta'>
            {renderFollowButton()}
            <button className='review-btn hide-for-mobile' onClick={handleReviewSlider}>
              Reviews
            </button>
            {user && userInfo.id === user._id && (
              <button className='post-hero__delete-btn' onClick={() => deleteHandler(_id)}>
                <i className='fas fa-trash'></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostHero;
