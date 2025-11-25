const express = require('express');
const app = express();
const PORT = 3000;

// import the router
const postRouter = require('./routes/post.routes');

app.get('/', (req, res) => {
  res.send('Welcome to the Blogify API!');
});

// mount the router
app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});