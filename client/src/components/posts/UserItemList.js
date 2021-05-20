import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  listUserPosts,
  listLikedPosts,
  listFollowedPosts,
  listTopPosts,
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
import Spinner from '../layout/Spinner';

const UserItemList = ({ userId, type, setModalState, modalState }) => {
  const dispatch = useDispatch();

  const [modalList, setModalList] = useState([]);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (type === MODAL_USER_POSTS) {
      dispatch(listUserPosts(userId)).then((data) => {
        setLoading(false);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_FOLLOWED_POSTS) {
      dispatch(listFollowedPosts(userId)).then((data) => {
        setLoading(false);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_LIKED_POSTS) {
      dispatch(listLikedPosts(userId)).then((data) => {
        setLoading(false);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_TOP_POSTS) {
      dispatch(listTopPosts(10)).then((data) => {
        setLoading(false);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === MODAL_FOLLOWED_PROFILES) {
      dispatch(listFollowedProfiles(userId)).then((data) => {
        setLoading(false);
        setModalType('PROFILES');
        setModalList(data);
      });
    }
  }, [dispatch, type, userId]);

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
          {!loading &&
            modalList &&
            modalList.map((post) => (
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
          {!loading &&
            modalList &&
            modalList.map((profile) => (
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
      <div className='useritemlist'>
        {!loading ? renderModalList(modalType) : <Spinner modal={true} />}
      </div>
    </>
  );
};

export default UserItemList;
