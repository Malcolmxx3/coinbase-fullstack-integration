const express = require('express');
const cors = require('cors');
const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'coinbase-clone-backend API is running'
  });
});

app.use('/api/v1/health', healthRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
