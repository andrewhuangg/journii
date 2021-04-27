const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostsById,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  followPost,
  unfollowPost,
  addComment,
  deleteComment,
  getFollowedPosts,
  createPostReview,
  deletePostReview,
  updatePost,
  getTopPosts,
  getLatestPosts,
  getLikedPosts,
} = require('../controllers/posts');

const router = express.Router({ mergeParams: true });
// merged routes
router.route('/likedposts').get(getLikedPosts);
router.route('/followedposts').get(getFollowedPosts);

router.route('/top/:limit').get(getTopPosts);
router.route('/latest/:limit').get(getLatestPosts);
router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, addComment);
router.route('/comment/:id/:commentId').delete(protect, deleteComment);
router.route('/review/:id').post(protect, createPostReview);
router.route('/review/:id/:reviewId').delete(protect, deletePostReview);
router.route('/follow/:id').put(protect, followPost);
router.route('/unfollow/:id').put(protect, unfollowPost);
router.route('/users/:userId').get(getPostsById);
router.route('/:id').get(getPost).delete(protect, deletePost).put(protect, updatePost);
router.route('/').post(protect, createPost).get(getPosts);

module.exports = router;
