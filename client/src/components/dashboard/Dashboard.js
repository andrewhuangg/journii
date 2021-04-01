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

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const posts = useSelector((state) => state.posts.postList);
  const { latestPosts, followedPosts, likedPosts, topPosts } = posts;

  const followedProfiles = useSelector((state) => state.profiles.profileList);
  const { profiles } = followedProfiles;

  useEffect(() => {
    dispatch(listLatestPosts());
  }, []);

  useEffect(() => {
    dispatch(listFollowedProfiles(userInfo.id));
  }, [userInfo]);

  useEffect(() => {
    dispatch(listTopPosts(10));
  }, []);

  useEffect(() => {
    dispatch(listLikedPosts(userInfo.id));
  }, [userInfo]);

  useEffect(() => {
    dispatch(listFollowedPosts(userInfo.id));
  }, [userInfo]);

  return (
    <>
      <main className='dashboard container'>
        <DashboardLeft
          likedPosts={likedPosts}
          profilesFollowing={profiles}
          postsFollowing={followedPosts}
        />
        <DashboardMain latestPosts={latestPosts} />
        <DashboardRight topPosts={topPosts} />
      </main>
    </>
  );
};

export default Dashboard;
