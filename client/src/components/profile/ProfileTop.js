import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followProfile, unfollowProfile, deleteProfile } from '../../actions/profileAction';
import { useHistory } from 'react-router-dom';

const ProfileTop = ({
  profile,
  profile: { _id, username, website, user, social, bio, follows },
  loggedInUser,
  profileUser,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [followed, setFollowed] = useState(false);

  // const userDetails = useSelector((state) => state.auth.userShow);
  // const { user: profileUser } = userDetails;

  // useEffect(() => {
  //   dispatch(getUserDetails(match.params.id));
  // }, [match]);

  useEffect(() => {
    follows.map((follow) => follow.user).includes(loggedInUser.id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [follows]);

  const profileFollowHandler = (profile, id) => {
    dispatch(followProfile(profile, id));
  };

  const profileUnfollowHandler = (profile, id) => {
    dispatch(unfollowProfile(profile, id));
  };

  const deleteHandler = (id) => {
    dispatch(deleteProfile(id)).then(() => {
      history.push('/profiles');
    });
  };

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
      profileUser.image !== null && profileUser.image !== undefined
        ? profileUser.image
        : unsplashImage
    })`,
  };

  // add loader spinner
  // check for https:// for social links (as a button instead of anchor and then redirect)

  return (
    <section className='profile-top'>
      <div className='profile-top__image' style={randomDefaultImage}></div>
      <div className='profile-top__text'>
        <h2 className='profile-top__name'>{user ? user.name.trim() : ''}</h2>
        <div className='profile-top__bio'>{bio}</div>
        <div className='profile-top__username'>{username}</div>
        <div className='profile-top__social'>
          <div className='profile-top__follow'>
            <i className='fas fa-users' />
            {follows.length > 0 && (
              <div className='profile-top__follow-count'>{follows.length}</div>
            )}
          </div>
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
        <div className='profile-top__cta'>
          {/* loggedIn user's id and the profile user id */}
          {loggedInUser.id !== profileUser.id ? (
            <button
              className='profile-top__follow-btn'
              onClick={() => {
                followed
                  ? profileUnfollowHandler(profile, profile._id)
                  : profileFollowHandler(profile, profile._id);
              }}
            >
              {followed ? 'Unfollow' : 'Follow'}
            </button>
          ) : (
            <button className='profile-top__delete-btn' onClick={() => deleteHandler(_id)}>
              <i className='fas fa-trash'></i>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileTop;
