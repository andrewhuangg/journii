const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getOwnProfile, createProfile, updateProfile, getProfiles } = require('../controllers/profiles');
const advancedQuery = require('../middleware/advancedQuery');
const Profile = require('../models/Profile');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

router.route('/me').get(protect, getOwnProfile);
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

router.route('/:id').put(protect, updateProfile);

module.exports = router;
