import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deletePostComment } from '../../actions/postAction';
import { setAlert } from '../../actions/alertAction';

const CommentItem = ({ postId, userInfo, comment: { _id, text, user, name, date } }) => {
  const dispatch = useDispatch();

  const deleteCommentHandler = (postId, commentId) => {
    dispatch(deletePostComment(postId, commentId));
    dispatch(setAlert('comment deleted', 'success'));
  };

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
