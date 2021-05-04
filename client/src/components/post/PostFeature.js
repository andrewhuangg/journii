import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postAction';

const PostFeature = ({ post, post: { _id, likes, text, follows }, userInfo }) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    likes.map((like) => like.user).includes(userInfo.id) ? setLiked(true) : setLiked(false);
  }, [likes, userInfo.id]);

  const postLikeHandler = (post, id) => {
    setLiked(true);
    dispatch(likePost(post, id));
  };

  const postUnlikeHandler = (post, id) => {
    setLiked(false);
    dispatch(unlikePost(post, id));
  };

  return (
    <section className='post-feature container'>
      {userInfo && (
        <aside className='post-feature__cta'>
          <div className='post-feature__cta-grid-parent'>
            <div className='post-feature__cta-grid-child'>
              <div className='post-feature__cta-like'>
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    liked ? postUnlikeHandler(post, _id) : postLikeHandler(post, _id);
                  }}
                />
                {likes.length > 0 && (
                  <div
                    className={`${
                      liked ? 'post-feature__like-count' : 'post-feature__cta-like-count'
                    }`}
                  >
                    {likes.length}
                  </div>
                )}
              </div>
              <div className='post-feature__cta-follow'>
                <i className='fas fa-users' />{' '}
                {follows.length > 0 && (
                  <div
                    className={`${
                      liked ? 'post-feature__follow-count' : 'post-feature__cta-follow-count'
                    }`}
                  >
                    {follows.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      )}
      <div className='post-feature__text'>{text}</div>
    </section>
  );
};

export default PostFeature;
