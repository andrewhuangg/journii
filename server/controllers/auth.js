// const asyncHandler = require('../middleware/async');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// @desc      Register new user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new ErrorResponse('User already exists', 400);

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    image,
  });

  if (user) {
    const token = user.getSignedJwtToken();
    res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    throw new ErrorResponse('Invalid user data', 400);
  }
});

// @desc      Login new user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) throw new ErrorResponse('Please provide an email and password', 400);

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (user && isMatch) {
    const token = user.getSignedJwtToken();
    res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    throw new ErrorResponse('Invalid credentials', 401);
  }
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('ownProfile');
  if (!user) throw new ErrorResponse(`User ${req.user._id} was not found`, 400);
  res.status(200).json(user);
});

// @desc      Log user out
// @route     GET /api/v1/auth/logout
// @access    Private

exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: 'User successfully logged out' });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private

exports.updateDetails = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user) throw new ErrorResponse('User not found', 401);
  const fieldsToUpdate = {
    name: req.body.name || user.name,
    email: req.body.email || user.email,
    phone: req.body.phone || user.phone,
    about: req.body.about || user.about,
    image: req.body.image || user.image,
  };

  user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(user);
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private

exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    throw new ErrorResponse('Password is incorrect', 401);
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({ token });
});

// @desc      Delete User
// @route     PUT /api/v1/auth/:id
// @access    Private

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user._id.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.params.id} is not authorized to delete this profile`, 401);

  // Remove user posts
  await Post.deleteMany({ user: req.user._id });

  // Remove user profile
  await Profile.deleteMany({ user: req.user._id });

  await user.remove();

  res.status(200).json({ msg: 'User successfully removed ' });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ErrorResponse('There is no user with that email', 404);

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create resetUrl
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `you are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset token',
      message,
    });

    res.status(200).json({ msg: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw new ErrorResponse('Email could not be sent', 500);
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public

exports.resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorResponse('Invalid Token', 400);
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({ token });
});

// @desc      Get user by id
// @route     GET /api/v1/auth/:id
// @access    Private

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    throw new ErrorResponse(`User ${req.params.id} was not found`, 404);
  }
});

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Public

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
