// GET /posts
const getAllPosts = (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: "List of all posts" }
  });
};

// GET /posts/:id
const getPostById = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    data: { message: `Details of post ${id}` }
  });
};

// POST /posts
const createPost = (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required"
    });
  }

  res.status(201).json({
    success: true,
    data: {
      message: `Post created successfully`,
      title,
      content
    }
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost
};
