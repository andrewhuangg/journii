const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async');
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc      Get top rated posts
// @route     GET /api/v1/posts/top/:limit
// @access    Public

exports.getTopPosts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit);
  const posts = await Post.find({}).sort({ rating: -1 }).limit(limit);
  res.status(200).json(posts);
});

// @desc      Get latest posts
// @route     GET /api/v1/posts/latest/:limit/?keyword=:keyword&pageNumber=:pageNumber
// @access    Public

exports.getLatestPosts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit);
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  const pages = Math.ceil(count / limit);
  res.status(200).json({ posts, page, pages });
});

// @desc      Get liked posts
// @route     GET /api/v1/users/:userId/posts/likedposts
// @access    Public
exports.getLikedPosts = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new Error(`user not found with the id of ${userId}`, 404);

  const posts = await Post.find({ 'likes.user': userId });
  return res.status(200).json(posts);
});

// @desc      Get all followed posts
// @route     GET /api/v1/users/:userId/posts/followedposts
// @access    Public

exports.getFollowedPosts = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new Error(`user not found with the id of ${req.params.userId}`, 404);

  const posts = await Post.find({ 'follows.user': userId });
  return res.status(200).json(posts);
});

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
    title: req.body.title,
    image: req.body.image,
  };

  const post = await Post.create(newPost);
  res.status(200).json(post);
});

// @desc      Update post
// @route     PUT /api/v1/posts/:id
// @access    Private

exports.updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  // Make sure user is post owner
  if (post.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to update this post`, 401);

  const postImageField = { image: '' };

  if (req.body.image.length > 0) postImageField.image = req.body.image;

  post = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body, ...postImageField } },
    { new: true, runValidators: true }
  );

  res.status(200).json(post);
});

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Public

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort('-createdAt');
  res.status(200).json(posts);
});

// @desc      Get all posts by id
// @route     GET /api/v1/posts/users/:userId
// @access    Public

exports.getPostsById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new Error(`user not found with the id of ${req.params.userId}`, 404);
  const posts = await Post.find({ user: userId }).sort('-createdAt');
  res.status(200).json(posts);
});

// @desc      Get post by id
// @route     GET /api/v1/posts/:id
// @access    Public

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

  if (post.user.toString() !== req.user._id.toString())
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
    throw new ErrorResponse(`User ${req.user._id} is not authorized to delete this comment`, 401);

  // Get remove index
  const removeIdx = post.comments.map((com) => com.id.toString()).indexOf(comment.id.toString());
  post.comments.splice(removeIdx, 1);

  await post.save();
  res.status(200).json(post.comments);
});

// @desc      Create review for a post
// @route     POST /api/v1/posts/review/:id
// @access    Private

exports.createPostReview = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) throw new ErrorResponse(`user not found with the id of ${req.user._id}`, 404);

  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  const { rating, comment } = req.body;

  if (post) {
    const postReviewed = post.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (postReviewed) {
      throw new ErrorResponse(`Post ${req.params.id} already reviewed`, 400);
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    post.reviews.unshift(review);
    post.numReviews = post.reviews.length;
    post.rating = post.reviews.reduce((acc, rev) => rev.rating + acc, 0) / post.reviews.length;

    await post.save();
    res.status(200).json(post.reviews);
  }
});

// @desc      Delete a review
// @route     DELETE /api/v1/posts/review/:id/:reviewId
// @access    Private

exports.deletePostReview = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ErrorResponse(`post not found with the id of ${req.params.id}`, 404);

  // Pull out the review
  const review = post.reviews.find((rev) => rev.id === req.params.reviewId);
  if (!review)
    throw new ErrorResponse(`review not found with the id of ${req.params.reviewId}`, 404);

  // Check review owner
  if (review.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to delete this review`, 401);

  // Get remove index
  const removeIdx = post.reviews.map((rev) => rev.id.toString()).indexOf(review.id.toString());
  post.reviews.splice(removeIdx, 1);

  await post.save();
  res.status(200).json(post.reviews);
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
