import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import Moment from 'react-moment';

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
  return (
    <>
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
      </div>
    </>
  );
};

export default PostItem;
