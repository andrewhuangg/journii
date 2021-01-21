import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({
  postId,
  deleteCommentHandler,
  userInfo,
  comment: { _id, text, user, name, date },
}) => {
  return (
    <div className='comment'>
      <Link to={`/profile/${user}`}>{name}</Link>
      <div className='comment__text'>
        <p>{text}</p>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>{' '}
      </div>
      {userInfo.id === user && (
        <Button onClick={() => deleteCommentHandler(postId, _id)}>
          <i className='fas fa-trash'></i>
        </Button>
      )}
    </div>
  );
};

export default CommentItem;
