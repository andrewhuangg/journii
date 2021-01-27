import React from 'react';

const ProfileTop = ({ profile: { username, website, social, user }, user: { image } }) => {
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
    backgroundImage: `url(${image !== null && image !== undefined ? image : unsplashImage})`,
  };

  return (
    <section className='profile-top'>
      <div className='profile-top__image' style={randomDefaultImage}></div>
      <div className='profile-top__text'>
        <h2 className='profile-top__name'>{user && user.name.trim()}</h2>
        <div className='profile-top__username'>{username}</div>
        <div className='profile-top__social'>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x' />
            </a>
          )}

          {social && social.twitter && (
            <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter fa-2x' />
            </a>
          )}

          {social && social.facebook && (
            <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x' />
            </a>
          )}

          {social && social.linkedin && (
            <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x' />
            </a>
          )}

          {social && social.instagram && (
            <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram fa-2x' />
            </a>
          )}

          {social && social.youtube && (
            <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x' />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileTop;
