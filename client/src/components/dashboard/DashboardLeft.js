import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFollowedPosts, listLikedPosts } from '../../actions/postAction';
import { listFollowedProfiles } from '../../actions/profileAction';
import { Link } from 'react-router-dom';

const DashboardLeft = ({ userInfo }) => {
  const dispatch = useDispatch();

  const dashboardPosts = useSelector((state) => state.posts.postList);
  const { followedPosts, likedPosts } = dashboardPosts;

  const followedProfiles = useSelector((state) => state.profiles.profileList);
  const { profiles } = followedProfiles;

  useEffect(() => {
    dispatch(listFollowedPosts(userInfo.id));
    dispatch(listLikedPosts(userInfo.id));
    dispatch(listFollowedProfiles(userInfo.id));
  }, [userInfo]);

  return (
    <aside className='dashboard__left'>
      <div className='dashboard__user-stats'>
        <h6>Liked Posts</h6>
        {likedPosts.map((post) => (
          <div className='dashboard__liked-container' key={post._id}>
            <Link to={`posts/${post._id}`}>
              <p>{post.title}</p>
              &nbsp;
              <i className='fas fa-heart'>
                &nbsp;
                {post.likes.length}
              </i>
            </Link>
          </div>
        ))}
      </div>
      <div className='dashboard__user-stats'>
        <h6>Followed Posts</h6>
        {followedPosts.map((post) => (
          <div className='dashboard__post-following-container' key={post._id}>
            <Link to={`posts/${post._id}`}>{post.title}</Link>
          </div>
        ))}
      </div>
      <div className='dashboard__user-stats'>
        <h6>Followed Profiles</h6>
        {profiles.map((follower) => (
          <div className='dashboard__follower-container' key={follower._id}>
            <Link to={`profile/${follower.user}`}>{follower.username}</Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DashboardLeft;
