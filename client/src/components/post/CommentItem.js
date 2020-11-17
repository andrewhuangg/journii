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
    <div>
      <div>
        <h6>
          <Link to={`/profile/${user}`}>{name}</Link>
        </h6>
      </div>
      <div>
        <p>{text}</p>
      </div>
      <p>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>{' '}
      </p>
      {userInfo.id === user && (
        <Button onClick={() => deleteCommentHandler(postId, _id)}>
          <i className='fas fa-trash'></i>
        </Button>
      )}
    </div>
  );
};

export default CommentItem;
