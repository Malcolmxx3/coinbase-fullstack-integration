const express = require('express');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true });
});

// Register routes above this line

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
