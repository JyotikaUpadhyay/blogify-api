const router = require("express").Router();
const postRoutes = require("./post.routes");

router.use("/api/v1/posts", postRoutes);

module.exports = router;
