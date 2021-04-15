import React from 'react';
import LatestPostItem from './LatestPostItem';
import Modal from '../layout/Modal';

const DashboardMain = ({
  latestPosts,
  type,
  userInfo,
  modalState,
  modalRef,
  setModalState,
  location,
}) => {
  return (
    <section className='dashboard__main-content'>
      <Modal
        userInfo={userInfo}
        type={type}
        modalState={modalState}
        modalRef={modalRef}
        setModalState={setModalState}
        location={location}
      />
      <div className='dashboard__main-container'>
        <h6>Latest Posts</h6>
        {latestPosts.map((latestPost) => (
          <div key={latestPost._id}>
            <LatestPostItem post={latestPost} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardMain;
