import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFollowedPosts, listLikedPosts } from '../../actions/postAction';
import { listFollowedProfiles } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import {
  MODAL_LIKED_POSTS,
  MODAL_FOLLOWED_POSTS,
  MODAL_FOLLOWED_PROFILES,
} from '../../actions/types';

const DashboardLeft = ({ userInfo, toggleModalState }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const dashboardPosts = useSelector((state) => state.posts.postList);
  const { followedPosts, likedPosts } = dashboardPosts;

  const followedProfiles = useSelector((state) => state.profiles.profileList);
  const { profilesFollowed } = followedProfiles;

  useEffect(() => {
    dispatch(listFollowedPosts(userInfo.id)).then((data) => data && setLoading(false));
    dispatch(listLikedPosts(userInfo.id)).then((data) => data && setLoading(false));
    dispatch(listFollowedProfiles(userInfo.id)).then((data) => data && setLoading(false));
  }, [dispatch, userInfo.id]);

  return (
    <aside className='dashboard__left'>
      <div className='dashboard__user-stats'>
        <h6 onClick={() => toggleModalState(MODAL_LIKED_POSTS, 'dashboard')}>Liked Posts</h6>
        {!loading &&
          likedPosts.map((post) => (
            <div className='dashboard__liked-container' key={post._id}>
              <Link to={`/posts/${post._id}`}>
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
        <h6 onClick={() => toggleModalState(MODAL_FOLLOWED_POSTS, 'dashboard')}>Followed Posts</h6>
        {!loading &&
          followedPosts.map((post) => (
            <div className='dashboard__post-following-container' key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </div>
          ))}
      </div>
      <div className='dashboard__user-stats'>
        <h6 onClick={() => toggleModalState(MODAL_FOLLOWED_PROFILES, 'dashboard')}>
          Followed Profiles
        </h6>
        {!loading &&
          profilesFollowed.map((follower) => (
            <div className='dashboard__follower-container' key={follower._id}>
              <Link to={`/profile/${follower.user}`}>{follower.username}</Link>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default DashboardLeft;
