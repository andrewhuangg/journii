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
const advancedQuery = require('../middleware/advancedQuery');
const Profile = require('../models/Profile');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

router.route('/experience').put(protect, createProfileExperience);
router.route('/project').put(protect, createProfileProject);
router.route('/me').get(protect, getOwnProfile);
router.route('/experience/:experienceId').delete(protect, deleteProfileExperience);
router.route('/project/:projectId').delete(protect, deleteProfileProject);
router.route('/users/:userId').get(getProfile);
router.route('/github/:username').get(getGithubRepo);
router.route('/follow/:id').put(protect, followProfile);
router.route('/unfollow/:id').put(protect, unfollowProfile);
router.route('/:id').put(protect, updateProfile).delete(protect, deleteProfile);

router.route('/followedprofiles').get(
  protect,
  advancedQuery(Profile, {
    path: 'user',
    select: 'name email',
  }),
  getFollowedProfiles
);

router
  .route('/')
  .get(
    advancedQuery(Profile, {
      path: 'user',
      select: 'name email',
    }),
    getProfiles
  )
  .post(protect, createProfile);

module.exports = router;
