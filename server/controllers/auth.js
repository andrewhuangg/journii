const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// @desc      Register new user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Login new user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) return next(new ErrorResponse('Please provide an email nad password', 400));

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorResponse('Invalid credentials', 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return next(new ErrorResponse(`User ${req.user.id} was not found`, 400));
  res.status(200).json({ success: true, data: user });
});

// @desc      Log user out
// @route     GET /api/v1/auth/logout
// @access    Private

exports.logout = asyncHandler(async (req, res, next) => {
  // res.cookie('token', 'none', {
  //   expires: new Date(Date.now() + 5 * 1000),
  //   httpOnly: true,
  // });

  res.status(200).json({ success: true, data: {} });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Delete Usere
// @route     PUT /api/v1/auth/:id
// @access    Private

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user._id.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this profile`, 401));
  }

  // Remove user posts
  await Post.deleteMany({ user: req.user.id });

  await user.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse('There is no user with that email', 404));

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

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// HELPER FUNCTION => Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
// Create Token
// const token = user.getSignedJwtToken();

// // * 60 seconds * 60 minutes * 1000 milliseconds
// // cookie accessible client side only
// const options = {
//   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000),
//   httpOnly: true,
// };

// if (process.env.NODE_ENV === 'production') {
//   options.secure = true;
// }

// calling our cookie 'token'
// res.status(statusCode).cookie('token', token, options).json({
//   success: true,
//   token,
// });
// };
