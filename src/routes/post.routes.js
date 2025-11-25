const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Fetching all blog posts from the modular router!');
});

module.exports = router;