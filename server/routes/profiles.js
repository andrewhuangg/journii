const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getOwnProfile,
  createProfile,
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  createProfileExperience,
  deleteProfileExperience,
  createProfileProject,
  deleteProfileProject,
  getGithubRepo,
  getFollowedProfiles,
  followProfile,
  unfollowProfile,
} = require('../controllers/profiles');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

router.route('/experience').put(protect, createProfileExperience);
router.route('/project').put(protect, createProfileProject);
router.route('/me').get(protect, getOwnProfile);
router.route('/followedprofiles').get(getFollowedProfiles);
router.route('/experience/:experienceId').delete(protect, deleteProfileExperience);
router.route('/project/:projectId').delete(protect, deleteProfileProject);
router.route('/users/:userId').get(getProfile);
router.route('/github/:username').get(getGithubRepo);
router.route('/follow/:id').put(protect, followProfile);
router.route('/unfollow/:id').put(protect, unfollowProfile);
router.route('/:id').put(protect, updateProfile).delete(protect, deleteProfile);
router.route('/').get(getProfiles).post(protect, createProfile);

module.exports = router;
