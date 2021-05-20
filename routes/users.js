const express = require('express');
const router = express.Router();

// Include other resource routers
const profileRouter = require('./profiles');
const postRouter = require('./posts');

// Re-route into other resources
router.use('/:userId/profiles', profileRouter);
router.use('/:userId/posts', postRouter);

module.exports = router;
