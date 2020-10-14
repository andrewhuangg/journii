import React from 'react';

const ProfileTop = ({
  profile: {
    website,
    social,
    location,
    user: { name },
  },
}) => {
  return (
    <div>
      img
      <h1>{name}</h1>
      <p>{location && location.formattedAddress && <span>{location.formattedAddress}</span>}</p>
      <div>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            {website}
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            {social.twitter}
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            {social.facebook}
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            {social.youtube}
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            {social.instagram}
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            {social.linkedin}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
