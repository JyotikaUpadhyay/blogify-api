const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

// ✅ GET /api/analytics/dashboard (if mounted at /api)
router.get("/analytics/dashboard", analyticsController.getDashboardAnalytics);

module.exports = router;
