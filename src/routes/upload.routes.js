const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const authenticate = require("../middlewares/auth.middleware");
const { uploadImage } = require("../controllers/upload.controller");

router.post("/", authenticate, upload.single("image"), uploadImage);

module.exports = router;
