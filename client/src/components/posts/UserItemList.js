import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  listUserPosts,
  listLikedPosts,
  listFollowedPosts,
  listTopPosts,
  deletePost,
} from '../../actions/postAction';
import { listFollowedProfiles } from '../../actions/profileAction';
import {
  MODAL_LIKED_POSTS,
  MODAL_FOLLOWED_POSTS,
  MODAL_USER_POSTS,
  MODAL_FOLLOWED_PROFILES,
  MODAL_TOP_POSTS,
} from '../../actions/types';
import { Link } from 'react-router-dom';

const UserItemList = ({ userInfo, type, setModalState, modalState }) => {
  const dispatch = useDispatch();

  const [modalList, setModalList] = useState([]);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === MODAL_USER_POSTS) {
      dispatch(listUserPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_FOLLOWED_POSTS) {
      dispatch(listFollowedPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_LIKED_POSTS) {
      dispatch(listLikedPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_TOP_POSTS) {
      dispatch(listTopPosts(20)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_FOLLOWED_PROFILES) {
      dispatch(listFollowedProfiles(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('PROFILES');
        setModalList(data);
      });
    }
  }, [userInfo, type]);

  const renderModalList = (modalType) => {
    return modalType === 'POSTS' ? (
      <div className='useritemlist__wrap'>
        <div className='useritemlist__header'>
          <h3>Posts</h3>
          <div className='useritemlist__closeModal' onClick={() => setModalState(!modalState)}>
            X
          </div>
        </div>
        <div className='useritemlist__container'>
          {modalList.map((post) => (
            <div className='useritemlist__item' key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className='useritemlist__wrap'>
        <div className='useritemlist__header'>
          <h3>Following</h3>
          <div className='useritemlist__closeModal'>X</div>
        </div>
        <div className='useritemlist__container'>
          {modalList.map((profile) => (
            <div className='useritemlist__item' key={profile._id}>
              <Link to={`/profile/${profile.user}`}>
                <p>{profile.username}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='useritemlist'>{renderModalList(modalType)}</div>
    </>
  );
};

export default UserItemList;
