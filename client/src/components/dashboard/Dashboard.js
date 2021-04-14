import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLatestPosts } from '../../actions/postAction';
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
  const { latestPosts } = posts;

  useEffect(() => {
    dispatch(listLatestPosts());
  }, []);

  return (
    <>
      <main className='dashboard container'>
        <DashboardLeft userInfo={userInfo} />
        <DashboardMain latestPosts={latestPosts} />
        <DashboardRight userInfo={userInfo} />
      </main>
    </>
  );
};

export default Dashboard;
