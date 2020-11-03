const express = require('express');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, authorize } = require('../middleware/auth');
const {
  createPost,
  getPosts,
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
} = require('../controllers/posts');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, createPost)
  .get(
    protect,
    advancedQuery(Post, {
      path: 'user',
      select: 'name email',
    }),
    getPosts
  );

router.route('/followedposts').get(
  protect,
  advancedQuery(Post, {
    path: 'user',
    select: 'name email',
  }),
  getFollowedPosts
);

router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, addComment);
router.route('/comment/:id/:commentId').delete(protect, deleteComment);
router.route('/review/:id').post(protect, createPostReview);
router.route('/review/:id/:reviewId').delete(protect, deletePostReview);
router.route('/follow/:id').put(protect, followPost);
router.route('/unfollow/:id').put(protect, unfollowPost);
router.route('/:id').get(protect, getPost).delete(protect, deletePost).put(protect, updatePost);

module.exports = router;
