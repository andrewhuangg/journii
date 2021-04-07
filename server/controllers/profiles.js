// const asyncHandler = require('../middleware/async');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const request = require('request');
const Profile = require('../models/Profile');

// @desc      Get all profiles
// @route     GET /api/v1/profiles
// @access    Public

exports.getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({}).populate({
    path: 'user',
    select: 'name email image',
  });
  res.status(200).json(profiles);
});

// @desc      Get profile by user id
// @route     GET /api/v1/profiles/users/:userId
// @access    Public

exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: 'user',
    select: 'name email',
  });

  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.user.userId}`, 404);

  res.status(200).json(profile);
});

// @desc      Get current users profile
// @route     GET /api/v1/profiles/me
// @access    Private

exports.getOwnProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate({
    path: 'user',
    select: 'name email',
  });

  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.user._id}`, 404);

  res.status(200).json(profile);
});

// @desc      Create a new profile
// @route     POST /api/v1/profiles
// @access    Private

exports.createProfile = asyncHandler(async (req, res) => {
  // assign the profiles user to the logged in user.
  req.body.user = req.user._id;

  // pull out the array fields to perform formatting, and other fields
  const {
    username,
    technologies,
    features,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  // check for duplicate username
  const profileExists = await Profile.findOne({ username });
  if (profileExists) throw new ErrorResponse('Username is taken', 400);

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

  res.status(201).json(profile);
});

// @desc      Update profile
// @route     PUT /api/v1/profiles/:id
// @access    Private

exports.updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404);

  // Make sure user is profile owner
  if (profile.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to update this profile`, 401);

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

  if (address) await profile.save();

  res.status(200).json(profile);
});

// @desc      Delete profile & user
// @route     Delete /api/v1/profiles/:id
// @access    Private

exports.deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404);

  if (profile.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to delete this profile`, 401);

  await profile.remove();

  res.status(200).json({ msg: 'Profile deleted' });
});

// @desc      Add profile project
// @route     PUT /api/v1/profiles/project
// @access    Private

exports.createProfileProject = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.user._id}`, 404);

  const { technologies, features } = req.body;
  if (technologies) req.body.technologies = technologies.split(',').map((tech) => tech.trim());
  if (features) req.body.features = features.split(',').map((feat) => feat.trim());

  profile.projects.unshift(req.body);
  await profile.save();
  res.status(200).json(profile.projects);
});

// @desc      Update profile project
// @route     PUT /api/v1/profiles/:id/project/:projectId
// @access    Private

exports.updateProfileProject = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({ user: req.user._id });

  if (!profile)
    throw new ErrorResponse(`profile not found with the user id of ${req.user._id}`, 404);

  if (profile.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to update this profile`, 401);

  const { technologies, features } = req.body;

  if (technologies) req.body.technologies = technologies.split(',').map((tech) => tech.trim());
  if (features) req.body.features = features.split(',').map((feat) => feat.trim());

  profile = await Profile.findOneAndUpdate(
    { _id: req.params.id, 'projects._id': req.params.projectId },
    {
      $set: { 'projects.$': { _id: req.params.projectId, ...req.body } },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(profile.projects);
});

// @desc      Delete profile project
// @route     Delete /api/v1/profiles/project/:projectId
// @access    Private

exports.deleteProfileProject = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.user._id}`, 404);

  // find the index of the experience to remove by id
  const removeIdx = profile.projects.map((proj) => proj.id).indexOf(req.params.projectId);

  profile.projects.splice(removeIdx, 1);

  await profile.save();
  res.status(200).json(profile.projects);
});

// @desc      Add profile experience
// @route     PUT /api/v1/profiles/experience
// @access    Private

exports.createProfileExperience = asyncHandler(async (req, res) => {
  // find profile for the current user by the user id
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile)
    throw new ErrorResponse(`profile not found with the user id of ${req.user._id}`, 404);

  profile.experiences.unshift(req.body);
  await profile.save();
  res.status(200).json(profile.experiences);
});

// @desc      Delete profile experience
// @route     Delete /api/v1/profiles/experience/:experienceId
// @access    Private

exports.deleteProfileExperience = asyncHandler(async (req, res) => {
  // find profile for the current user by the user id
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile)
    throw new ErrorResponse(`profile not found with the user id of ${req.user._id}`, 404);

  // find the index of the experience to remove by id
  const removeIdx = profile.experiences.map((exp) => exp.id).indexOf(req.params.experienceId);

  profile.experiences.splice(removeIdx, 1);

  await profile.save();
  res.status(200).json(profile.experiences);
});

// @desc      Update profile experience
// @route     PUT /api/v1/profiles/:id/experience/:experienceId
// @access    Private

exports.updateProfileExperience = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({ user: req.user._id });

  if (!profile)
    throw new ErrorResponse(`profile not found with the user id of ${req.user._id}`, 404);

  if (profile.user.toString() !== req.user._id.toString())
    throw new ErrorResponse(`User ${req.user._id} is not authorized to update this profile`, 401);

  profile = await Profile.findOneAndUpdate(
    { _id: req.params.id, 'experiences._id': req.params.experienceId },
    {
      //positional operator '$' && maintain originbal experience id
      $set: { 'experiences.$': { _id: req.params.experienceId, ...req.body } },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(profile.experiences);
});

// @desc      Get user repos from Github
// @route     GET /api/v1/profiles/github/:username
// @access    Public

exports.getGithubRepo = asyncHandler(async (req, res) => {
  const options = {
    uri: encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?type=owner&per_page=5&sort=pushed&order=desc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubSecret}`
    ),
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
  };

  request(options, (err, response, body) => {
    if (err) console.error(err.message);
    if (response.statusCode !== 200) {
      return res.status(404).json({ msg: 'no github profile found' });
    }

    res.status(200).json({ data: JSON.parse(body) });
  });
});

// @desc      Get all followed profiles
// @route     GET /api/v1/users/:userId/profiles/followedprofiles
// @access    Public

exports.getFollowedProfiles = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) throw new Error(`user not found with the id of ${userId}`, 404);

  const profiles = await Profile.find({ 'follows.user': userId });
  return res.status(200).json(profiles);
});

// @desc      Follow a profile
// @route     PUT /api/v1/profiles/follow/:id
// @access    Private

exports.followProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404);

  if (
    profile.follows.filter((follow) => follow.user.toString() === req.user._id.toString()).length >
    0
  )
    throw new ErrorResponse(`profile ${req.params.id} has already been followed`, 400);

  if (profile.user.toString() === req.user._id.toString())
    throw new ErrorResponse(`unable to follow own profile`, 400);

  profile.follows.unshift({ user: req.user._id });
  await profile.save();

  res.status(200).json(profile.follows);
});

// @desc      Unfollow a profile
// @route     PUT /api/v1/profiles/unfollow/:id
// @access    Private

exports.unfollowProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) throw new ErrorResponse(`profile not found with the id of ${req.params.id}`, 404);

  if (
    profile.follows.filter((follow) => follow.user.toString() === req.user._id.toString())
      .length === 0
  )
    throw new ErrorResponse(`profile ${req.params.id} has not yet been followed`, 400);

  // Get remove index
  const removeIdx = profile.follows.map((follow) => follow.user.toString()).indexOf(req.user._id);
  profile.follows.splice(removeIdx, 1);

  await profile.save();

  res.status(200).json(profile.follows);
});
