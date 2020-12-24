import React from 'react';
import { Link } from 'react-router-dom';
// import { followProfile, unFollowProfile, getFollowedProfiles } from '../../actions/profileAction';

const ProfileItem = ({
  profile: {
    bio,
    github,
    user: { _id, name, email },
    username,
    website,
  },
}) => {
  return (
    <>
      <Link to={`profile/${_id}`} className='profileItem'>
        <div className='profileItem__overlay'></div>
        <div className='profileItem__image'></div>
        <div className='profileItem__content'>
          <div className='profileItem__username'>{username}</div>
          <div className='profileItem__bio'>{bio}</div>
        </div>
        <div className='profileItem__website'>{website}</div>
        <div className='profileItem__github'>{github}</div>
      </Link>
    </>
  );
};

export default ProfileItem;
