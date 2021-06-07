import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { followProfile, unfollowProfile, deleteProfile } from '../../actions/profileAction';
import Modal from '../layout/Modal';
import {
  MODAL_LIKED_POSTS,
  MODAL_FOLLOWED_POSTS,
  MODAL_USER_POSTS,
  MODAL_FOLLOWED_PROFILES,
} from '../../actions/types';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const ProfileTop = ({
  profile,
  profile: { _id, username, website, user, social, bio, follows },
  matchParamsId,
  loggedInUser,
  profileUser,
  loading,
  history,
}) => {
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(false);
  const [type, setType] = useState('');
  const [modalState, setModalState] = useState(false);
  const [windowOffSet, setWindowOffSet] = useState(0);

  useEffect(() => {
    follows.map((follow) => follow.user).includes(loggedInUser.id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [loggedInUser.id, follows]);

  const modalRef = useRef(null);

  const handleModalRef = (e) => {
    modalRef.current && !modalRef.current.contains(e.target) && setModalState(!modalState);
  };

  useEffect(() => {
    const profileTopView = document.querySelector('.modal');
    if (modalState) {
      document.addEventListener('click', handleModalRef);
      document.body.setAttribute(
        'style',
        `position: fixed; 
        top: -${windowOffSet}px;
        left: 0;
        right: 0;
        `
      );
      profileTopView.setAttribute('style', `top: ${windowOffSet}px`);
    } else {
      document.body.setAttribute('style', '');
      document.removeEventListener('click', handleModalRef);
      window.scrollTo(0, windowOffSet);
    }

    return () => document.removeEventListener('click', handleModalRef);
  }, [modalState]);

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

  const toggleModalState = (type) => {
    setModalState(!modalState);
    setType(type);
    setWindowOffSet(window.scrollY);
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
      profileUser.image && profileUser.image.length > 0 ? profileUser.image : unsplashImage
    })`,
  };

  return (
    <>
      {!loading ? (
        <section className='profile-top'>
          <div className='profile-top__image' style={randomDefaultImage}></div>
          <div className='profile-top__text'>
            <h2 className='profile-top__name'>{user.name && user.name.trim()}</h2>
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
              <button
                className='modal__btn btn-like'
                onClick={() => toggleModalState(MODAL_LIKED_POSTS)}
              >
                Liked Posts
              </button>
              <button
                className='modal__btn btn-follow'
                onClick={() => toggleModalState(MODAL_FOLLOWED_POSTS)}
              >
                Followed Posts
              </button>
              <button
                className='modal__btn btn-user'
                onClick={() => toggleModalState(MODAL_USER_POSTS)}
              >
                {loggedInUser.id !== profileUser.id ? 'User Posts' : 'My Posts'}
              </button>
              <button
                className='modal__btn btn-profile'
                onClick={() => toggleModalState(MODAL_FOLLOWED_PROFILES)}
              >
                Following
              </button>
            </div>
          </div>
          <Modal
            userId={matchParamsId}
            type={type}
            modalState={modalState}
            modalRef={modalRef}
            setModalState={setModalState}
          />
        </section>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default ProfileTop;
