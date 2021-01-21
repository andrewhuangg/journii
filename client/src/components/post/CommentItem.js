import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({
  postId,
  deleteCommentHandler,
  userInfo,
  comment: { _id, text, user, name, date },
}) => {
  return (
    <div className='comments__grid-item'>
      <div className='comments__header'>
        <Link to={`/profile/${user}`} className='comments__author'>
          {name}
        </Link>
        <span></span>
        <Moment format='MM/DD/YYYY' className='comments__date'>
          {date}
        </Moment>{' '}
      </div>
      <div className='comments__text'>{text}</div>
      {userInfo.id === user && (
        <button className='comments__delete-btn' onClick={() => deleteCommentHandler(postId, _id)}>
          <i className='fas fa-trash'></i>
        </button>
      )}
    </div>
  );
};

export default CommentItem;
