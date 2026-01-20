const router = require("express").Router();
const postsController = require("../controllers/posts.controller");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsController.createPost);
router.patch("/:id", postsController.updatePostById);
router.delete("/:id", postsController.deletePostById);

module.exports = router;
