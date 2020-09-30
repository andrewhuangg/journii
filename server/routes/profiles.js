const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getOwnProfile, createProfile, updateProfile } = require('../controllers/profiles');
const advancedQuery = require('../middleware/advancedQuery');

// mergeParams helps us merge url params
const router = express.Router({ mergeParams: true });

router.route('/me').get(protect, getOwnProfile);
router.route('/').post(protect, createProfile);
router.route('/:id').put(protect, updateProfile);

module.exports = router;
