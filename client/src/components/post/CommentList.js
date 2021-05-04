import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ post: { comments, _id }, userInfo }) => {
  return (
    <section className='comments container'>
      <div className='comments__grid'>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={_id} userInfo={userInfo} />
        ))}
      </div>
    </section>
  );
};

export default CommentList;
