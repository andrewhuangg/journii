import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listLatestPosts,
  listTopPosts,
  listFollowedPosts,
  listLikedPosts,
} from '../../actions/postAction';
import { listFollowedProfiles } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';
import DashboardMain from './DashboardMain';

const Dashboard = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postLatest = useSelector((state) => state.postLatest);
  const { loading: loadingLatest, error: errorLatest, posts: latestPosts } = postLatest;

  const postTopRated = useSelector((state) => state.postTopRated);
  const { loading: loadingTopPosts, error: errorTopPost, posts: topPosts } = postTopRated;

  const postListFollowing = useSelector((state) => state.postListFollowing);
  const {
    loading: loadingListPostFollowers,
    error: errorListPostFollowers,
    posts: postsFollowing,
  } = postListFollowing;

  const postListLiked = useSelector((state) => state.postListLiked);
  const { loading: loadingListLiked, error: errorListLiked, posts: likedPosts } = postListLiked;

  const profileListFollowing = useSelector((state) => state.profileListFollowing);
  const {
    loading: loadingListFollowers,
    error: errorListFollowers,
    profiles: profilesFollowing,
  } = profileListFollowing;

  useEffect(() => {
    dispatch(listLatestPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listFollowedProfiles(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(listTopPosts(10));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listLikedPosts(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(listFollowedPosts(userInfo.id));
  }, [dispatch, userInfo]);

  return (
    <>
      {loadingLatest && <Spinner />}
      <main className='dashboard container'>
        <DashboardLeft
          likedPosts={likedPosts}
          profilesFollowing={profilesFollowing}
          postsFollowing={postsFollowing}
        />
        <DashboardMain latestPosts={latestPosts} />
        <DashboardRight topPosts={topPosts} />
      </main>
    </>
  );
};

export default Dashboard;
