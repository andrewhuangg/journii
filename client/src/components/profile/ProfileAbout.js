import React from 'react';

const ProfileAbout = ({ profile: { bio, user } }) => {
  return (
    <>
      <section className='profile-about'>
        <div className='profile-about__bio'>{bio}</div>
      </section>
    </>
  );
};

export default ProfileAbout;
