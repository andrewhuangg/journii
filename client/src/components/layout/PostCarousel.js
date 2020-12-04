import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import AlertMessage from './AlertMessage';
import Spinner from './Spinner';
import { listTopPosts } from '../../actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const PostCarousel = () => {
  const dispatch = useDispatch();
  const postTopRated = useSelector((state) => state.postTopRated);
  const { loading, error, posts } = postTopRated;

  useEffect(() => {
    dispatch(listTopPosts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <AlertMessage variant='danger'>{error}</AlertMessage>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {posts.map((post) => (
        <Carousel.Item key={post._id}>
          <Link to={`/posts/${post._id}`}></Link>
          <Image src={post.image} alt={post.title} fluid />
          <Carousel.Caption className='carousel-caption'></Carousel.Caption>
          <h2>{post.title}</h2>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PostCarousel;
