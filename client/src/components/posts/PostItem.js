import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Rating from '../layout/Rating';

const PostItem = ({
  post: {
    _id,
    text,
    user,
    name,
    title,
    image,
    rating,
    numReviews,
    likes,
    follows,
    comments,
    createdAt,
  },
  currentUserId,
  deleteHandler,
}) => {
  const imageUrl = 'https://journii-dev.s3-us-west-1.amazonaws.com/default_post_image.jpg';
  // placeholder until we find an api for random pages
  return (
    <>
      <Link to={`posts/${_id}`} className='postItem'>
        <div
          className='postItem__image'
          style={{ backgroundImage: `url(${image ? image : imageUrl})` }}
        ></div>
        <div className='postItem__content'>
          <div className='postItem__title'>{title}</div>
          <div className='postItem__text'>{text}</div>
        </div>
        <div className='postItem__likes'>
          {likes.length > 0 && likes.length} <i class='fas fa-heart' />
        </div>
        <div className='postItem__comments'>
          {comments.length > 0 && comments.length} <i class='fas fa-comments' />
        </div>
        <div className='postItem__follows'>
          {follows.length > 0 && follows.length} <i class='fas fa-users' />
        </div>
        <div className='postItem__rating'>
          <Rating value={rating} text={`${numReviews}`} />
        </div>
        <div className='postItem__date'>
          <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
        </div>
      </Link>
    </>
  );
};

export default PostItem;

/*
<div>
        {image && <Image src={image} alt={title} fluid />}
        <h6>
          <Link to={`posts/${_id}`}>{title}</Link>
        </h6>
        <p>{text}</p>
        <p>
          Publisher <Link to={`profiles/${user}`}>{name}</Link>
        </p>
        <p>
          Posted on <Moment format='MM/DD/YYYY'>{createdAt}</Moment>
        </p>

        <ul>
          <li>
            <Link to={`posts/${_id}`}>likes {likes.length > 0 && <span>{likes.length}</span>}</Link>
          </li>
          <li>
            <Link to={`posts/${_id}`}>
              follows {follows.length > 0 && <span>{follows.length}</span>}
            </Link>
          </li>
          <li>
            <Link to={`posts/${_id}`}>
              comments {comments.length > 0 && <span>{comments.length}</span>}
            </Link>
          </li>
          <li>
            <Link to={`posts/${_id}`}>reviews {numReviews > 0 && <span>{numReviews}</span>}</Link>
          </li>
        </ul>
        {currentUserId === user && <p>{<Link to={`editpost/${_id}`}>Edit Post</Link>} </p>}
        {currentUserId === user && (
          <Button onClick={() => deleteHandler(_id)}>
            <i className='fas fa-trash'></i>
          </Button>
        )}
        <div>
          <Rating value={rating} text={` ${numReviews} reviews`} />
        </div>
      </div>
*/
