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
} = require('../controllers/profiles');
const advancedQuery = require('../middleware/advancedQuery');
const Profile = require('../models/Profile');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

router.route('/experience').put(protect, createProfileExperience);
router.route('/me').get(protect, getOwnProfile);
router.route('/users/:userId').get(getProfile);
router.route('/:id').put(protect, updateProfile).delete(protect, deleteProfile);
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
