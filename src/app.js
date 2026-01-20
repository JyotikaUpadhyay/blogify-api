const express = require("express");

const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// middleware to parse JSON
app.use(express.json());

// routes
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/auth", authRoutes);

// global error handler
app.use(errorMiddleware);

module.exports = app;
