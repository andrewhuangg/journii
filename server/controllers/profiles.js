const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc      Get all profiles
// @route     GET /api/v1/profiles
// @access    Public

exports.getProfiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedQuery);
});

// @desc      Get profile by user id
// @route     GET /api/v1/profiles/users/:userId
// @access    Public

exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: 'user',
    select: 'name email',
  });

  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.user.userId}`, 404));

  res.status(200).json({ success: true, data: profile });
});

// @desc      Get current users profile
// @route     GET /api/v1/profiles/me
// @access    Private

exports.getOwnProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: 'name email',
  });

  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.user.id}`, 404));

  res.status(200).json({ success: true, data: profile });
});

// @desc      Create a new profile
// @route     POST /api/v1/users/:userId/profiles
// @access    Private

exports.createProfile = asyncHandler(async (req, res, next) => {
  // assign the profiles user to the logged in user.
  req.body.user = req.user.id;

  // pull out the array fields to perform formatting
  const { technologies, features, youtube, twitter, facebook, linkedin, instagram } = req.body;

  // grab the user by the params, so we can check if the :userId is the actual logged in user
  const user = await User.findById(req.params.userId);

  // Make sure user is the owner of the profile
  if (user._id.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to create this spot`, 401));
  }

  // format fields array
  if (technologies) req.body.technologies = technologies.split(',').map((tech) => tech.trim());
  if (features) req.body.features = features.split(',').map((feat) => feat.trim());

  // ensure social object is built if fields are required
  const socialFields = {};
  socialFields.social = {};
  if (youtube) socialFields.social.youtube = youtube;
  if (twitter) socialFields.social.twitter = twitter;
  if (facebook) socialFields.social.facebook = facebook;
  if (linkedin) socialFields.social.linkedin = linkedin;
  if (instagram) socialFields.social.instagram = instagram;

  const profile = await Profile.create({ ...req.body, ...socialFields });

  res.status(201).json({ success: true, data: profile });
});

// @desc      Update profile
// @route     PUT /api/v1/profiles/:id
// @access    Private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404));

  // Make sure user is profile owner
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this profile`, 401));
  }

  const { youtube, twitter, facebook, linkedin, instagram, address } = req.body;

  const socialFields = {};
  socialFields.social = {};
  if (youtube) socialFields.social.youtube = youtube;
  if (twitter) socialFields.social.twitter = twitter;
  if (facebook) socialFields.social.facebook = facebook;
  if (linkedin) socialFields.social.linkedin = linkedin;
  if (instagram) socialFields.social.instagram = instagram;

  profile = await Profile.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body, ...socialFields } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (address) {
    await profile.save();
  }

  res.status(200).json({ success: true, data: profile });
});

// @desc      Delete profile
// @route     PUT /api/v1/profiles/:id
// @access    Private

exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404));

  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this profile`, 401));
  }

  await profile.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Add profile experience
// @route     PUT /api/v1/profiles/experience
// @access    Private

exports.createProfileExperience = asyncHandler(async (req, res, next) => {
  // find profile for the current user by the user id
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.user.id}`, 404));

  profile.experience.unshift(req.body);
  await profile.save();
  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Delete profile experience
// @route     Delete /api/v1/profiles/experience/:experienceId
// @access    Private

exports.deleteProfileExperience = asyncHandler(async (req, res, next) => {
  // find profile for the current user by the user id
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) return next(new ErrorResponse(`profile not found with the id of ${req.user.id}`, 404));

  // find the index of the experience to remove by id
  const removeIdx = profile.experience.map((exp) => exp.id).indexOf(req.params.experienceId);

  profile.experience.splice(removeIdx, 1);

  await profile.save();
  res.status(200).json({
    success: true,
    data: profile,
  });
});
