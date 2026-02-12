const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    return res.status(201).json({ message: "Post created", post });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  return res.json({ posts });
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Pillar 5: Authorization
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not your post" });
    }

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
