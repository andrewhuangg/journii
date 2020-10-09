import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({ post: { _id, user, text, name, likes, comments, follows, date }, auth }) => {
  return (
    <div>
      <div>
        <a>
          img
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type='button'>likes {likes.length > 0 && <span>{likes.length}</span>}</button>
        <button type='button'>dislike</button>
        <Link to={`/posts/${_id}`}>
          Discussion {comments.length > 0 && <span>{comments.length}</span>}
        </Link>
        <button type='button'>follow {follows.length > 0 && <span>{follows.length}</span>}</button>
        {!auth.loading && user._id === auth.user.data._id && <button type='button'>delete</button>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
