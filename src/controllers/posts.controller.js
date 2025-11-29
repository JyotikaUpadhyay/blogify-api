// src/controllers/posts.controller.js

// Temporary in-memory "database"
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' },
];

// GET /api/v1/posts → get all posts
const getAllPosts = async (req, res) => {
  res.status(200).json({
    message: 'Fetching all posts',
    data: posts,
  });
};

// GET /api/v1/posts/:postId → dynamic route
const getPostById = async (req, res) => {
  const postId = req.params.postId; // capture the URL parameter

  // For the assignment, we only need to return the ID.
  return res.status(200).json({
    message: `Fetching data for post with ID: ${postId}`,
  });
};

module.exports = {
  getAllPosts,
  getPostById,
};

