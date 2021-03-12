import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listUserPosts,
  listFollowedPosts,
  listLikedPosts,
  listTopPosts,
} from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import Meta from '../layout/Meta';

const UserPostList = () => {
  const dispatch = useDispatch();

  const listUsers = useSelector((state) => state.listUserPosts);
  const {
    loading: loadingUserList,
    error: errorUserList,
    success: successUserList,
    posts: userPosts,
  } = listUsers;

  const listFollowedPosts = useSelector((state) => state.postListFollowing);
  const {
    loading: loadingFollowedList,
    error: errorFollowedList,
    success: successFollowedList,
    posts: followedPosts,
  };

  const listLikedPosts = useSelector((state) => state.postListLiked);
  const {
    loading: loadingLikedList,
    error: errorLikedList,
    success: successLikedList,
    posts: likedPosts,
  };

  const listTopPosts = useSelector((state) => state.postTopRated);
  const {
    loading: loadingTopList,
    error: errorLikedList,
    success: successLikedList,
    posts: topPosts,
  };

  return <div></div>;
};

export default UserPostList;
