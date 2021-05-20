import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, followPost, unfollowPost } from '../../actions/postAction';
import { setAlert } from '../../actions/alertAction';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostHero = ({
  post,
  post: { _id, title, name, createdAt, image, follows },
  user: { id },
  userInfo,
  handleReviewSlider,
  history,
}) => {
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    follows.map((follow) => follow.user).includes(userInfo.id)
      ? setFollowed(true)
      : setFollowed(false);

    if (title.length > 99) {
      dispatch(
        setAlert(
          'title may not contain more than 100 chars, please edit your post to continue',
          'error'
        )
      );
    }
  }, [dispatch, userInfo.id, title, follows]);

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
    history.push('/posts');
  };

  const postFollowHandler = (post, id) => {
    dispatch(followPost(post, id));
  };

  const postUnfollowHandler = (post, id) => {
    dispatch(unfollowPost(post, id));
  };

  const unsplashURL = 'https://source.unsplash.com/collection/289662/';
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * 10) + 900;
    return num;
  };
  const getRandomSize = () => {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  };

  const unsplashImage = `${unsplashURL}${getRandomSize()}`;
  const randomDefaultImage = {
    backgroundImage: `url(${image ? image : unsplashImage})`,
  };

  return (
    <section className='post-hero container'>
      <div className='container'>
        <div className='post-hero__image' style={randomDefaultImage}></div>
        <div className='post-hero__header container--pall'>
          <h1>{title}</h1>
          <p>
            Publisher{' '}
            <Link to={`/profile/${id}`} className='post-hero__a'>
              {name}
            </Link>
          </p>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
          <div className='post-hero__cta'>
            <button className='review-btn hide-for-mobile' onClick={handleReviewSlider}>
              Reviews
            </button>
            {/* loggedIn user's id and the post user id */}
            {userInfo.id !== id ? (
              <button
                className='post-hero__follow-btn'
                onClick={() =>
                  followed ? postUnfollowHandler(post, _id) : postFollowHandler(post, _id)
                }
              >
                {followed ? 'Unfollow' : 'Follow'}
              </button>
            ) : (
              <>
                <Link to={`/editpost/${_id}`} id='post-hero__edit-link'>
                  <button className='post-hero__edit-btn'>Edit</button>
                </Link>

                <button className='post-hero__delete-btn' onClick={() => deleteHandler(_id)}>
                  <i className='fas fa-trash'></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostHero;
