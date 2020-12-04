const express = require('express');
const { protect, authorize } = require('../middleware/auth');
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
} = require('../controllers/posts');

const router = express.Router({ mergeParams: true });

router.route('/top').get(getTopPosts);
router.route('/followedposts').get(protect, getFollowedPosts);
router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, addComment);
router.route('/comment/:id/:commentId').delete(protect, deleteComment);
router.route('/review/:id').post(protect, createPostReview);
router.route('/review/:id/:reviewId').delete(protect, deletePostReview);
router.route('/follow/:id').put(protect, followPost);
router.route('/unfollow/:id').put(protect, unfollowPost);
router.route('/users/:userId').get(getPostsById);
router.route('/:id').get(protect, getPost).delete(protect, deletePost).put(protect, updatePost);
router.route('/').post(protect, createPost).get(getPosts);

module.exports = router;
