import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, email, name },
    bio,
    company,
    location,
    technologies,
    features,
  },
}) => {
  return (
    <div>
      img
      <div>
        <h2>{name}</h2>
        <p>{company && <span> currently at {company}</span>}</p>
        <p>{location && <span>residing at {location.formattedAddress}</span>}</p>
        <Link to={`/profile/${_id}`}> View Profile</Link>
      </div>
      <ul>
        {technologies.slice(0, 4).map((tech, idx) => (
          <li key={idx}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
