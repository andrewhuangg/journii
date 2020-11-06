import React from 'react';

const ProfileAbout = ({ profile: { bio, user } }) => {
  return (
    <>
      {bio && (
        <>
          <h2>{user.name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <span>------</span>
        </>
      )}
    </>
  );
};

export default ProfileAbout;
