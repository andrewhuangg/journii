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
  const { latestPosts } = posts;

  useEffect(() => {
    dispatch(listLatestPosts());
  }, []);

  const modalRef = useRef(null);

  const handleModalRef = (e) => {
    modalRef.current && !modalRef.current.contains(e.target) && setModalState(!modalState);
  };

  const toggleModalState = (type, location) => {
    setModalState(!modalState);
    setType(type);
    setLocation(location);
  };

  useEffect(() => {
    if (modalState) {
      document.addEventListener('click', handleModalRef);
      setWindowOffSet(window.scrollY);
      document.body.setAttribute(
        'style',
        `position: fixed; 
      top: -${windowOffSet}px;
      left: 0;
      right: 0;
      `
      );
    } else {
      document.removeEventListener('click', handleModalRef);
      document.body.setAttribute('style', '');
      window.scrollTo(0, windowOffSet);
    }

    return () => document.removeEventListener('click', handleModalRef);
  }, [modalState]);

  return (
    <>
      <main className='dashboard container'>
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
    </>
  );
};

export default Dashboard;
