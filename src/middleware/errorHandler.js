function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;

  if (err.name === 'ValidationError' || Array.isArray(err.errors)) {
    const message = Array.isArray(err.errors)
      ? err.errors.map((item) => item.msg || item.message).filter(Boolean).join(', ')
      : err.message;

    return res.status(400).json({
      success: false,
      message: message || 'Validation error',
    });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}

function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
