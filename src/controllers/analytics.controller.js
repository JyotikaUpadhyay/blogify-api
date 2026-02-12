// src/controllers/analytics.controller.js
const Post = require("../models/post.model");

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const topAuthors = await Post.aggregate([
      // 1) group by authorId and count posts
      {
        $group: {
          _id: "$authorId", // ✅ change to authorId (matches your Blogify schema)
          postCount: { $sum: 1 },
        },
      },

      // 2) sort highest first
      { $sort: { postCount: -1 } },

      // 3) take top 5
      { $limit: 5 },

      // 4) join with users collection
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "authorDetails",
        },
      },

      // 5) flatten array (keep docs even if user missing)
      {
        $unwind: {
          path: "$authorDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 6) final shape
      {
        $project: {
          _id: 0,
          authorId: "$_id",
          postCount: 1,
          authorName: "$authorDetails.name",
          authorEmail: "$authorDetails.email",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: topAuthors,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardAnalytics,
};
