import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
  post: { _id, user, text, name, likes, comments, follows },
}) => {
  return (
    <div>
      <div>
        <a>
          img
          <h4>John Doe</h4>
        </a>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus
          corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis.
          Amet accusamus distinctio cupiditate blanditiis dolor? Illo
          perferendis eveniet cum cupiditate aliquam?
        </p>
        <p>Posted on 04/16/2019</p>
        <button type='button'>
          likes
          <span>4</span>
        </button>
        <button type='button'>dislike</button>
        <a>
          Discussion comments
          <span>2</span>
        </a>
        <button type='button'>delet</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
