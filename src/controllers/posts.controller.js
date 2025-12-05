// src/controllers/posts.controller.js

// Temporary in-memory "database"
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' },
];

// GET /api/v1/posts → get all posts
const getAllPosts = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: "All posts fetched successfully"
    }
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    data: {
      postId: id
    }
  });
};



module.exports = {
  getAllPosts,
  getPostById,
};

