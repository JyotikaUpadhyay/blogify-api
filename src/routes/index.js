const express = require('express');
const router = express.Router();

// Import resource router
const postRouter = require('./post.routes');

// Delegate routes
router.use('/posts', postRouter);

module.exports = router;
