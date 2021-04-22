import React, { useState, useEffect, useRef } from 'react';
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

  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [modalState, setModalState] = useState(false);
  const [windowOffSet, setWindowOffSet] = useState(0);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const posts = useSelector((state) => state.posts.postList);
  const { latestPosts, loading } = posts;

  useEffect(() => {
    if (!keyword) {
      dispatch(listLatestPosts());
    } else {
      dispatch(listLatestPosts(10, keyword));
    }
  }, [dispatch, keyword]);

  const modalRef = useRef(null);

  const handleModalRef = (e) => {
    modalRef.current && !modalRef.current.contains(e.target) && setModalState(!modalState);
  };

  const toggleModalState = (type, location) => {
    setModalState(!modalState);
    setType(type);
    setLocation(location);
    setWindowOffSet(window.scrollY);
  };

  useEffect(() => {
    const dashboardView = document.querySelector('.modaldashboard');
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
      dashboardView.setAttribute('style', `top: ${windowOffSet}px`);
    } else {
      document.body.setAttribute('style', '');
      document.removeEventListener('click', handleModalRef);
      window.scrollTo(0, windowOffSet);
    }

    return () => document.removeEventListener('click', handleModalRef);
  }, [modalState]);

  return (
    <>
      {!loading ? (
        <main className='dashboard container'>
          <Meta title='journii | Home' />
          <DashboardLeft userInfo={userInfo} toggleModalState={toggleModalState} />
          <DashboardMain
            latestPosts={latestPosts}
            type={type}
            userInfo={userInfo}
            modalState={modalState}
            modalRef={modalRef}
            setModalState={setModalState}
            location={location}
          />
          <DashboardRight userInfo={userInfo} toggleModalState={toggleModalState} />
        </main>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Dashboard;
