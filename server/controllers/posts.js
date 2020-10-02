const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc      Create post
// @route     POST /api/v1/posts
// @access    Private

exports.createPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) return next(new ErrorResponse(`user not found with the id of ${req.user.id}`, 404));

  const newPost = {
    user: req.user.id,
    text: req.body.text,
    name: user.name,
  };

  const post = await Post.create(newPost);
  res.status(200).json({ success: true, data: post });
});

// @desc      Get all ppsts
// @route     GET /api/v1/posts
// @route     GET /api/v1/users/:userId/posts
// @access    Private

exports.getPosts = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const posts = await Post.find({ user: req.params.userId }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } else {
    res.status(200).json(res.advancedQuery);
  }
});

// @desc      Get post by id
// @route     GET /api/v1/posts/:id
// @access    Private

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'user',
    select: 'name email',
  });

  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  res.status(200).json({ success: true, data: post });
});

// @desc      Delete post
// @route     DELETE /api/v1/posts/:id
// @access    Private

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this post`, 401));
  }

  await post.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Like a post
// @route     PUT /api/v1/posts/like/:id
// @access    Private

exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
    return next(new ErrorResponse(`post ${req.params.id} has already been liked`, 400));
  }

  post.likes.unshift({ user: req.user.id });
  await post.save();

  res.status(200).json({ success: true, data: post.likes });
});

// @desc      Unlike a post
// @route     PUT /api/v1/posts/unlike/:id
// @access    Private

exports.unlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
    return next(new ErrorResponse(`post ${req.params.id} has not yet been liked`, 400));
  }

  // Get remove index
  const removeIdx = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);
  post.likes.splice(removeIdx, 1);

  await post.save();

  res.status(200).json({ success: true, data: post.likes });
});

// @desc      Comment on a post
// @route     POST /api/v1/posts/comment/:id
// @access    Private

exports.addComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return next(new ErrorResponse(`user not found with the id of ${req.user.id}`, 404));

  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  const newComment = {
    user: req.user.id,
    text: req.body.text,
    name: user.name,
  };

  post.comments.unshift(newComment);

  await post.save();
  res.status(200).json({ success: true, data: post.comments });
});

// @desc      Delete a comment
// @route     DELETE /api/v1/posts/comment/:id/:commentId
// @access    Private

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorResponse(`post not found with the id of ${req.params.id}`, 404));

  // Pull out the comment
  const comment = post.comments.find((comment) => comment.id === req.params.commentId);
  if (!comment) return next(new ErrorResponse(`comment not found with the id of ${req.params.commentId}`, 404));

  // Check comment owner
  if (comment.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this post`, 401));
  }

  // Get remove index
  const removeIdx = post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id);
  post.comments.splice(removeIdx, 1);

  await post.save();
  res.status(200).json({ success: true, data: post.comments });
});

// @desc      Follow a post
// @route     PUT /api/v1/posts/follow/:id
// @access    Private

exports.followPost = asyncHandler(async (req, res, next) => {});
