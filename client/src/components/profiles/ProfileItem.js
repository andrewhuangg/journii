import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
// import { followProfile, unFollowProfile, getFollowedProfiles } from '../../actions/profileAction';

const ProfileItem = ({
  profile: {
    bio,
    user: { _id, image },
    username,
    createdAt,
    follows,
  },
}) => {
  const unsplashURL = 'https://source.unsplash.com/collection/614531/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 600;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${image !== null && image !== undefined ? image : unsplashImage})`,
  };

  return (
    <>
      <Link to={`profile/${_id}`} className='profileItem'>
        <div className='profileItem__overlay'>
          <span>see profile</span>
        </div>
        <div className='profileItem__image' style={randomDefaultImage}></div>
        <div className='profileItem__content'>
          <div className='profileItem__username'>{username}</div>
          <div className='profileItem__bio'>{bio}</div>
        </div>
        <div className='profileItem__created'>
          joined <Moment format='MM/YYYY'>{createdAt}</Moment>
        </div>
        <div className='profileItem__followers'>{follows.length} Followers</div>
      </Link>
    </>
  );
};

export default ProfileItem;
