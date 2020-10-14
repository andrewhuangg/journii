import React from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    technologies,
    features,
    user: { name, email },
  },
}) => {
  return (
    <div>
      <h2>{name.trim().split(' ')[0]}s Bio</h2>
      <p>{bio}</p>
      {/* <h2>Skill Set</h2>
      <div>
        {technologies.length > 0 && (
          <>
            {technologies.map((tech, idx) => (
              <div key={idx}>{tech}</div>
            ))}
          </>
        )}
      </div>
      <div>
        {features.length > 0 && (
          <>
            {features.map((feat, idx) => (
              <div key={idx}>{feat}</div>
            ))}
          </>
        )}
      </div> */}
    </div>
  );
};

export default ProfileAbout;
