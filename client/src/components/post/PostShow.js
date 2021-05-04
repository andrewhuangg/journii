import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPostDetails } from '../../actions/postAction';
import { getUserDetails } from '../../actions/authAction';
import CreateComment from './CreateComment';
import ReviewSlider from './ReviewSlider';
import PostHero from './PostHero';
import CommentList from './CommentList';
import Meta from '../layout/Meta';
import PostFeature from './PostFeature';
import Spinner from '../layout/Spinner';
import AlertMessage from '../layout/AlertMessage';

const PostShow = ({ match }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.auth.userShow);
  const { user } = userDetails;

  const postShow = useSelector((state) => state.posts.post);
  const { post, loading } = postShow;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id)).then((post) => {
      if (post) dispatch(getUserDetails(post.user.id));
    });
  }, []);

  const sliderRef = useRef(null);

  const handleClickSliderOpen = (e) => {
    sliderRef.current && !sliderRef.current.contains(e.target) && setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? document.addEventListener('click', handleClickSliderOpen)
      : document.removeEventListener('click', handleClickSliderOpen);

    return () => document.removeEventListener('click', handleClickSliderOpen);
  }, [isOpen]);

  const handleReviewSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!loading ? (
        <>
          <Meta title='journii | Post' />
          <AlertMessage />
          <ReviewSlider
            post={post}
            handleReviewSlider={handleReviewSlider}
            userInfo={userInfo}
            sliderRef={sliderRef}
            isOpen={isOpen}
            reviews
          />
          <PostHero
            post={post}
            handleReviewSlider={handleReviewSlider}
            userInfo={userInfo}
            user={user}
          />
          <PostFeature post={post} userInfo={userInfo} />
          <CreateComment postId={post && post._id} />
          <CommentList post={post} userInfo={userInfo} />{' '}
        </>
      ) : (
        <>
          <Spinner />
          <AlertMessage />
        </>
      )}
    </>
  );
};

export default PostShow;
