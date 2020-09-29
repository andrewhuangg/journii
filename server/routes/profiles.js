const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getOwnProfile } = require('../controllers/profiles');

router.route('/me').get(protect, getOwnProfile);

module.exports = router;
