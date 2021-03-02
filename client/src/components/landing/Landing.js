import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopPosts } from '../../actions/postAction';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';
import Meta from '../layout/Meta';
import LandingShowcase from './LandingShowcase';
import LandingHero from './LandingHero';
import LandingFeature from './LandingFeature';
import LandingPosts from './LandingPosts';
import LandingFooter from './LandingFooter';

const Landing = () => {
  const dispatch = useDispatch();
  const postTopRated = useSelector((state) => state.postTopRated);
  const { loading, error, posts } = postTopRated;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listTopPosts(4));
  }, [dispatch]);

  return (
    <>
      <Meta />
      {loading && <Spinner />}
      {error && <AlertMessage>{error}</AlertMessage>}

      <LandingShowcase userInfo={userInfo} />

      <LandingHero />

      <LandingFeature />

      <LandingPosts posts={posts} />

      <LandingFooter />
    </>
  );
};

export default Landing;
