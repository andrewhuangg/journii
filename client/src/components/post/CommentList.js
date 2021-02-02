import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ post: { comments, _id }, userInfo, deleteCommentHandler }) => {
  return (
    <section className='comments container'>
      <div className='comments__grid'>
        {comments &&
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={_id}
              deleteCommentHandler={deleteCommentHandler}
              userInfo={userInfo}
            />
          ))}
      </div>
    </section>
  );
};

export default CommentList;
