import React from 'react';
import { Link } from 'react-router-dom';
// import { followProfile, unFollowProfile, getFollowedProfiles } from '../../actions/profileAction';

const ProfileItem = ({
  profile: {
    bio,
    github,
    user: { _id, name, email, image },
    username,
    website,
  },
}) => {
  const imageUrl = 'https://journii-dev.s3-us-west-1.amazonaws.com/default_post_image.jpg';
  // placeholder until we find an api for random pages

  return (
    <>
      <Link to={`profile/${_id}`} className='profileItem'>
        <div className='profileItem__overlay'>
          <span>see profile</span>
        </div>
        <div
          className='profileItem__image'
          style={{ backgroundImage: `url(${image ? image : imageUrl})` }}
        ></div>
        <div className='profileItem__content'>
          <div className='profileItem__username'>{username}</div>
          <div className='profileItem__bio'>{bio}</div>
        </div>
      </Link>
    </>
  );
};

export default ProfileItem;
