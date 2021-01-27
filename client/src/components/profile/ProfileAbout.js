import React from 'react';

const ProfileAbout = ({ profile: { bio, user } }) => {
  console.log(user);

  return (
    <>
      <div className='profile-about'>
        <div className='profile-about__bio'>{bio}</div>
      </div>
    </>
  );
};

export default ProfileAbout;
