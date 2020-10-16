import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, email, name },
    bio,
    location,
  },
}) => {
  return (
    <div>
      img
      <div>
        <h2>{name}</h2>
        <p>{location && <span>residing at {location.formattedAddress}</span>}</p>
        <Link to={`/profile/${_id}`}> View Profile</Link>
      </div>
    </div>
  );
};

export default ProfileItem;
