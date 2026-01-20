const postService = require("../services/posts.service");

const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const post = await postService.updatePostById(req.params.id, req.body);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const post = await postService.deletePostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
