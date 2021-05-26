import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopPosts } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import Meta from '../layout/Meta';
import LandingShowcase from './LandingShowcase';
import LandingHero from './LandingHero';
import LandingFeature from './LandingFeature';
import LandingPosts from './LandingPosts';
import LandingFooter from './LandingFooter';
import AlertMessage from '../layout/AlertMessage';

const Landing = () => {
  const dispatch = useDispatch();

  const postTopRated = useSelector((state) => state.posts.postList);
  const { topPosts, loading } = postTopRated;

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const loggedInUser = useSelector((state) => state.auth.userShow);
  const { currentUser } = loggedInUser;

  useEffect(() => {
    dispatch(listTopPosts(4));
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <>
          <Meta />
          <AlertMessage />

          <LandingShowcase userInfo={userInfo} />

          <LandingHero currentUser={currentUser} userInfo={userInfo} />

          <LandingFeature />

          <LandingPosts posts={topPosts} userInfo={userInfo} />

          <LandingFooter currentUser={currentUser} userInfo={userInfo} />
        </>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default Landing;
