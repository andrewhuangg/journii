import React from 'react';
import { Link } from 'react-router-dom';
import { followProfile, unFollowProfile, getFollowedProfiles } from '../../actions/profileAction';

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
      <div>
        <p>bio: {bio}</p>
        <p>github: {github}</p>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>username: {username}</p>
        <p>website: {website}</p>
        <div>
          <Link to={`/profile/${_id}`}>view profile</Link>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
