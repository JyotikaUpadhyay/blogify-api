const router = require("express").Router();

const protect = require("../middlewares/auth.middleware");

const { createPost, getAllPosts, deletePost } = require("../controllers/posts.controller");

router.get("/", getAllPosts);

// Protected
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);

module.exports = router;
