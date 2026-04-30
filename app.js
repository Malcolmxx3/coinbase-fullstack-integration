const express = require('express');
const cryptoRoutes = require('./routes/crypto');

const app = express();

app.use(express.json());
app.use('/api/crypto', cryptoRoutes);

module.exports = app;
