const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async');
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc      Create post
// @route     POST /api/v1/posts
// @access    Private

exports.createPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) throw new ErrorResponse(`user not found with the id of ${req.user._id}`, 404);

  const newPost = {
    user: req.user._id,
    text: req.body.text,
    name: user.name,
  };

  const post = await Post.create(newPost);
  res.status(200).json(post);
});

// @desc      Get all posts
// @route     GET /api/v1/posts
// @route     GET /api/v1/users/:userId/posts
// @access    Private

exports.getPosts = asyncHandler(async (req, res) => {
  let posts;
  if (req.params.userId) {
    posts = await Post.find({ user: req.params.userId }).sort({
      date: -1,
    });

    return res.status(200).json(posts);
  } else {
    posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  }
});

// @desc      Get post by id
// @route     GET /api/v1/posts/:id
// @access    Private

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'user',
    select: 'name email',
  });

  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  res.status(200).json(post);
});

// @desc      Delete post
// @route     DELETE /api/v1/posts/:id
// @access    Private

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  if (post.user.toString() !== req.user._id)
    throw new ErrorResponse(`User ${req.user._id} is not authorized to delete this post`, 401);

  await post.remove();

  res.status(200).json({ msg: 'post removed' });
});

// @desc      Like a post
// @route     PUT /api/v1/posts/like/:id
// @access    Private

exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  if (post.likes.filter((like) => like.user.toString() === req.user._id.toString()).length > 0)
    throw new ErrorResponse(`post ${req.params.id} has already been liked`, 400);

  post.likes.unshift({ user: req.user._id });
  await post.save();

  res.status(200).json(post.likes);
});

// @desc      Unlike a post
// @route     PUT /api/v1/posts/unlike/:id
// @access    Private

exports.unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  if (post.likes.filter((like) => like.user.toString() === req.user._id.toString()).length === 0)
    throw new ErrorResponse(`post ${req.params.id} has not yet been liked`, 400);

  // Get remove index
  const removeIdx = post.likes.map((like) => like.user.toString()).indexOf(req.user._id);
  post.likes.splice(removeIdx, 1);

  await post.save();

  res.status(200).json(post.likes);
});

// @desc      Comment on a post
// @route     POST /api/v1/posts/comment/:id
// @access    Private

exports.addComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) throw new ErrorResponse(`user not found with the id of ${req.user._id}`, 404);

  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  const newComment = {
    user: req.user._id,
    text: req.body.text,
    name: user.name,
  };

  post.comments.unshift(newComment);

  await post.save();
  res.status(200).json(post.comments);
});

// @desc      Delete a comment
// @route     DELETE /api/v1/posts/comment/:id/:commentId
// @access    Private

exports.deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  // Pull out the comment
  const comment = post.comments.find((comment) => comment.id === req.params.commentId);
  if (!comment)
    throw new ErrorResponse(`comment not found with the id of ${req.params.commentId}`, 404);

  // Check comment owner
  if (comment.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to delete this post`, 401);

  // Get remove index
  const removeIdx = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user._id.toString());
  post.comments.splice(removeIdx, 1);

  await post.save();
  res.status(200).json(post.comments);
});

// @desc      Follow a post
// @route     PUT /api/v1/posts/follow/:id
// @access    Private

exports.followPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  if (
    post.follows.filter((follow) => follow.user.toString() === req.user._id.toString()).length > 0
  )
    throw new ErrorResponse(`post ${req.params.id} has already been followed`, 400);

  if (post.user.toString() === req.user._id.toString())
    throw new ErrorResponse(`unable to follow own post`, 400);

  post.follows.unshift({ user: req.user._id });

  await post.save();

  res.status(200).json(post.follows);
});

// @desc      Unfollow a post
// @route     PUT /api/v1/posts/unfollow/:id
// @access    Private

exports.unfollowPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  if (
    post.follows.filter((follow) => follow.user.toString() === req.user._id.toString()).length === 0
  )
    throw new ErrorResponse(`post ${req.params.id} has not yet been followed`, 400);

  // Get remove index
  const removeIdx = post.follows.map((follow) => follow.user.toString()).indexOf(req.user._id);
  post.follows.splice(removeIdx, 1);

  await post.save();

  res.status(200).json(post.follows);
});

// @desc      Get all followed posts
// @route     GET /api/v1/users/:userId/posts/followedposts
// @access    Private

exports.getFollowedPosts = asyncHandler(async (req, res) => {
  if (req.params.userId) {
    const user = await User.findById(req.params.userId);
    const posts = await Post.find();
    const followedPosts = [];
    posts.map((p) => {
      p.follows.map((follow) => {
        if (follow.user.toString() === user._id.toString()) {
          followedPosts.push(p);
        }
      });
    });

    return res.status(200).json(followedPosts);
  } else {
    res.status(200).json(res.advancedQuery);
  }
});
