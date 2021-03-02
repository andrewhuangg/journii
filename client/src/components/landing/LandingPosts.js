import React from 'react';
import TopPostItem from '../layout/TopPostItem';

const LandingPosts = ({ posts }) => {
  return (
    <section className='posts'>
      <div className='post__content container container--pall'>
        <h2>Top Posts</h2>
        <div className='post__grid'>
          {posts.map((post) => (
            <TopPostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPosts;
