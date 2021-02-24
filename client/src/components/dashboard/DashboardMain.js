import React from 'react';
import LatestPostItem from './LatestPostItem';

const DashboardMain = ({ latestPosts }) => {
  return (
    <section className='dashboard__main-content'>
      <div className='dashboard__main-container'>
        <h6>Latest Posts</h6>
        {latestPosts.map((latestPost) => (
          <LatestPostItem post={latestPost} />
        ))}
      </div>
    </section>
  );
};

export default DashboardMain;
