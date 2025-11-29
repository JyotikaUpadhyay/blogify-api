// src/routes/posts.routes.js

const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts.controller.js');

// Route to get all posts
// GET /api/v1/posts
router.get('/', postController.getAllPosts);

// Dynamic route to get a single post by ID
// GET /api/v1/posts/:postId
router.get('/:postId', postController.getPostById);

module.exports = router;
