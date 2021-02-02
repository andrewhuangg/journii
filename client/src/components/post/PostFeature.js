import React from 'react';

const PostFeature = ({
  post,
  post: { _id, likes, text, follows },
  postLikeHandler,
  postUnlikeHandler,
  userInfo,
}) => {
  const renderCallAction = () => {
    if (likes && userInfo) {
      return post.likes.map((like) => like.user).includes(userInfo.id) ? (
        <aside className='post-feature__cta'>
          <div className='post-feature__cta-grid-parent'>
            <div className='post-feature__cta-grid-child'>
              <div className='post-feature__cta-like'>
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    postUnlikeHandler(post, _id);
                  }}
                />
                {likes.length > 0 && <div className='post-feature__like-count'>{likes.length}</div>}
              </div>
              <div className='post-feature__cta-follow'>
                <i className='fas fa-users' />{' '}
                {follows.length > 0 && (
                  <div className='post-feature__follow-count'>{follows.length}</div>
                )}
              </div>
            </div>
          </div>
        </aside>
      ) : (
        <aside className='post-feature__cta'>
          <div className='post-feature__cta-grid-parent'>
            <div className='post-feature__cta-grid-child'>
              <div className='post-feature__cta-like'>
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    postLikeHandler(post, _id);
                  }}
                />
                {likes.length > 0 && (
                  <div className='post-feature__cta-like-count'>{likes.length}</div>
                )}
              </div>
              <div className='post-feature__cta-follow'>
                <i className='fas fa-users' />{' '}
                {follows.length > 0 && (
                  <div className='post-feature__cta-follow-count'>{follows.length}</div>
                )}
              </div>
            </div>
          </div>
        </aside>
      );
    }
  };

  return (
    <section className='post-feature container'>
      {renderCallAction()}
      <div className='post-feature__text'>{text}</div>
    </section>
  );
};

export default PostFeature;
