const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getOwnProfile,
  createProfile,
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
  createProfileExperience,
  deleteProfileExperience,
  updateProfileExperience,
  getProfileExperience,
  createProfileProject,
  deleteProfileProject,
  updateProfileProject,
  getGithubRepo,
  getFollowedProfiles,
  followProfile,
  unfollowProfile,
} = require('../controllers/profiles');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

// route merged with /users/:userId/profiles/
router.route('/followedprofiles').get(getFollowedProfiles);

router.route('/me').get(protect, getOwnProfile);
router.route('/project').put(protect, createProfileProject);
router.route('/experience').put(protect, createProfileExperience);
router.route('/experience/:experienceId').delete(protect, deleteProfileExperience);
router.route('/users/:userId').get(getProfile);
router.route('/project/:projectId').delete(protect, deleteProfileProject);
router.route('/github/:username').get(getGithubRepo);
router.route('/unfollow/:id').put(protect, unfollowProfile);
router.route('/follow/:id').put(protect, followProfile);
router.route('/:id/experience/:experienceId').put(protect, updateProfileExperience);
router.route('/:id/profileexperience/:experienceId').get(protect, getProfileExperience);
router.route('/:id/project/:projectId').put(protect, updateProfileProject);
router.route('/:id').put(protect, updateProfile).delete(protect, deleteProfile);
router.route('/').get(getProfiles).post(protect, createProfile);

module.exports = router;
