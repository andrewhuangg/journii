const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc      Get current users profile
// @route     GET /api/v1/profiles/me
// @access    Private

exports.getOwnProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.user.id).populate({
    path: 'user',
    select: 'name email',
  });

  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.user.id}`, 404));

  res.status(200).json({ success: true, data: profile });
});
