const express = require('express');
const router = express.Router();

// Include other resource routers
const profileRouter = require('./profiles');

// Re-route into other resources
router.use('/:userId/profiles', profileRouter);

module.exports = router;
