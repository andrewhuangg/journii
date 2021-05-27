import React from 'react';
import { Link } from 'react-router-dom';
import LatestPostItem from './LatestPostItem';
import Modal from '../layout/Modal';

const DashboardMain = ({ latestPosts, type, userInfo, modalState, modalRef, setModalState }) => {
  return (
    <section className='dashboard__main-content'>
      <Modal
        userId={userInfo.id}
        type={type}
        modalState={modalState}
        modalRef={modalRef}
        setModalState={setModalState}
      />
      <div className='dashboard__main-container'>
        <h6>
          <Link to='/dashboard'>Latest Posts</Link>
        </h6>
        {latestPosts.map((latestPost) => (
          <div className='dashboard__main-item-wrapper' key={latestPost._id}>
            <LatestPostItem post={latestPost} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardMain;
