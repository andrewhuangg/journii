import React from 'react';

const ProfileTop = ({
  profile: {
    bio,
    website,
    company,
    social,
    location,
    technologies,
    features,
    experience,
    user: { name, email },
  },
}) => {
  return (
    <div>
      img
      <h1>{name}</h1>
      <p>{company && <span>{company}</span>}</p>
      <p>{location && location.formattedAddress && <span>{location.formattedAddress}</span>}</p>
      <div>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferer'>
            {website}
          </a>
        )}
        {social && social.twitter && <a href={social.twitter} target='_blank' rel='noopener noreferer'></a>}
        {social && social.facebook && <a href={social.facebook} target='_blank' rel='noopener noreferer'></a>}
        {social && social.youtube && <a href={social.youtube} target='_blank' rel='noopener noreferer'></a>}
        {social && social.instagram && <a href={social.instagram} target='_blank' rel='noopener noreferer'></a>}
        {social && social.linkedin && <a href={social.linkedin} target='_blank' rel='noopener noreferer'></a>}
      </div>
    </div>
  );
};

export default ProfileTop;
