import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPostComment } from '../../actions/postAction';

const CommentForm = () => {
  const [text, setText] = useState('');
  return <>comment form</>;
};

export default CommentForm;

// <div>
//   <div>
//     <h3>Leave a Comment</h3>
//   </div>
//   <form
//     onSubmit={(e) => {
//       e.preventDefault();
//       createPostComment(postId, { text });
//       setText('');
//     }}
//   >
//     <textarea
//       name='text'
//       cols='30'
//       rows='5'
//       placeholder='Write a comment...'
//       value={text}
//       onChange={(e) => setText(e.target.value)}
//       required
//     ></textarea>
//     <input type='submit' value='Submit' />
//   </form>
// </div>
