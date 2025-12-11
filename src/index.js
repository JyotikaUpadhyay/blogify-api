const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// IMPORT MAIN ROUTER (not post router directly)
const mainRouter = require('./routes');

// GLOBAL MIDDLEWARE
app.use(cors());       // Allow frontend to access backend
app.use(express.json());  // Parse JSON body

// ROOT ROUTE (optional for greeting)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Blogify API!'
  });
});

// MOUNT VERSIONED API ROUTER
app.use('/api/v1', mainRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
