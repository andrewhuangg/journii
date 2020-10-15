import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postAction';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div>
      <div>
        <h3>Leave a Comment</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Write a comment...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
