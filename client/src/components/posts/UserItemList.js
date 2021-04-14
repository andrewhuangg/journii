import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listUserPosts,
  listLikedPosts,
  listFollowedPosts,
  deletePost,
} from '../../actions/postAction';
import { listFollowedProfiles } from '../../actions/profileAction';
import { Link } from 'react-router-dom';

const UserItemList = ({ userInfo, type }) => {
  const dispatch = useDispatch();

  const [modalList, setModalList] = useState([]);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === 'USER_POSTS') {
      dispatch(listUserPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === 'FOLLOWED_POSTS') {
      dispatch(listFollowedPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === 'LIKED_POSTS') {
      dispatch(listLikedPosts(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('POSTS');
        setModalList(data);
      });
    } else if (type === 'FOLLOWED_PROFILES') {
      dispatch(listFollowedProfiles(userInfo.id)).then((data) => {
        setLoading(!loading);
        setModalType('PROFILES');
        setModalList(data);
      });
    }
  }, [userInfo, type]);

  const renderModalList = (modalType) => {
    return modalType === 'POSTS' ? (
      <div className='useritemlist__container'>
        {modalList.map((post) => (
          <div className='useritemlist__item' key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <p>{post.title}</p>
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <div className='useritemlist__container'>
        {modalList.map((profile) => (
          <div className='useritemlist__item' key={profile._id}>
            <Link to={`/profile/${profile.user}`}>{profile.username}</Link>
          </div>
        ))}
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
