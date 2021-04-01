import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPostDetails } from '../../actions/postAction';
import { getUserDetails } from '../../actions/authAction';
import AlertMessage from '../layout/AlertMessage';
import CreateComment from './CreateComment';
import ReviewSlider from './ReviewSlider';
import PostHero from './PostHero';
import CommentList from './CommentList';
import Meta from '../layout/Meta';
import PostFeature from './PostFeature';

const PostShow = ({ match }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const loginUser = useSelector((state) => state.auth.userAuth);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.auth.userShow);
  const { user } = userDetails;

  const postShow = useSelector((state) => state.posts.post);
  const { post } = postShow;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id)).then((post) => {
      dispatch(getUserDetails(post.user.id));
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
      <Meta title={`journii | ${post.title}`} />
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
      <CommentList post={post} userInfo={userInfo} />
    </>
  );
};

export default PostShow;
