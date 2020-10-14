import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, followPost, unFollowPost, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, user, text, name, likes, comments, follows, date },
  addLike,
  removeLike,
  followPost,
  unFollowPost,
  deletePost,
  showActions = true,
}) => {
  return (
    <div>
      <div>
        <Link to={`/profile/${user}`}>
          img
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <>
            <button onClick={(e) => addLike(_id)} type='button'>
              likes {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button onClick={(e) => removeLike(_id)} type='button'>
              dislike
            </button>
            <Link to={`/posts/${_id}`}>
              Discussion {comments.length > 0 && <span>{comments.length}</span>}
            </Link>
            {/* if already following, change follow to following */}
            <button onClick={(e) => followPost(_id)} type='button'>
              follow {follows.length > 0 && <span>{follows.length}</span>}
            </button>
            <button onClick={(e) => unFollowPost(_id)} type='button'>
              unfollow
            </button>
            {!auth.loading && user === auth.user._id && (
              <button onClick={(e) => deletePost(_id)} type='button'>
                delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  followPost,
  unFollowPost,
  deletePost,
})(PostItem);
