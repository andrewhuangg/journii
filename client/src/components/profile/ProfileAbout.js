import React from 'react';

const ProfileAbout = ({ bio, user }) => {
  const unsplashURL = 'https://source.unsplash.com/collection/614531/';

  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 600;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${
      user && user.image !== null && user.image !== undefined ? user.image : unsplashImage
    })`,
  };

  return (
    <>
      <div className='profile-about'>
        <h2 className='profile-about__name'>{user && user.name.trim().split(' ')[0]}'s Bio</h2>
        <div className='profile-about__bio'>{bio}</div>
      </div>
    </>
  );
};

export default ProfileAbout;
