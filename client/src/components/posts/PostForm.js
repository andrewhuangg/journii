import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postAction';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div>
      <div>
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
