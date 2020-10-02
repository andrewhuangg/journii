const express = require('express');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, authorize } = require('../middleware/auth');
const { createPost, getPosts, getPost, deletePost, likePost, unlikePost, followPost } = require('../controllers/posts');
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

router.route('/:id').get(protect, getPost).delete(protect, deletePost);
router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/follow/:id').put(protect, followPost);

module.exports = router;
