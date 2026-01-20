const Post = require("../models/post.model");

const createPost = async (payload) => {
  const post = await Post.create(payload);
  return post;
};

const getAllPosts = async () => {
  return Post.find().populate("author", "username");
};

const getPostById = async (id) => {
  return Post.findById(id).populate("author", "username");
};

const updatePostById = async (id, payload) => {
  return Post.findByIdAndUpdate(id, payload, { new: true }).populate(
    "author",
    "username"
  );
};

const deletePostById = async (id) => {
  return Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
