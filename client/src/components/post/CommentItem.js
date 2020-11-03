// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteComment } from '../../actions/postAction';
// import Moment from 'react-moment';

// const CommentItem = ({ postId, comment: { _id, text, name, user, date }, auth, deleteComment }) => {
//   return (
//     <div>
//       <div>
//         <Link to={`/profile/${user}`}>
//           img
//           <h4>{name}</h4>
//         </Link>
//       </div>
//       <div>
//         <p>{text}</p>
//         <p>
//           Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
//         </p>
//         {!auth.loading && user === auth.user._id && (
//           <button onClick={(e) => deleteComment(postId, _id)} type='button'>
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { deleteComment })(CommentItem);
