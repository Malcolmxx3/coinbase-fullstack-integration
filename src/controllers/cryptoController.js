const Crypto = require('../models/Crypto');

const validateCreateCryptoInput = (payload) => {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return ['Request body must be a valid JSON object.'];
  }

  if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) {
    errors.push('name is required and must be a non-empty string.');
  }

  if (!payload.symbol || typeof payload.symbol !== 'string' || !payload.symbol.trim()) {
    errors.push('symbol is required and must be a non-empty string.');
  }

  if (payload.price === undefined || Number.isNaN(Number(payload.price)) || Number(payload.price) < 0) {
    errors.push('price is required and must be a non-negative number.');
  }

  if (
    payload.change24h === undefined ||
    Number.isNaN(Number(payload.change24h))
  ) {
    errors.push('change24h is required and must be a number.');
  }

  return errors;
};

const getAllCryptos = async (req, res) => {
  const cryptos = await Crypto.find().sort({ createdAt: -1 });
  return res.status(200).json(cryptos);
};

const getTopGainers = async (req, res) => {
  const gainers = await Crypto.find().sort({ change24h: -1 });
  return res.status(200).json(gainers);
};

const getNewestCryptos = async (req, res) => {
  const newest = await Crypto.find().sort({ createdAt: -1 });
  return res.status(200).json(newest);
};

const createCrypto = async (req, res) => {
  const errors = validateCreateCryptoInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors,
    });
  }

  const crypto = await Crypto.create({
    name: req.body.name.trim(),
    symbol: req.body.symbol.trim().toUpperCase(),
    price: Number(req.body.price),
    change24h: Number(req.body.change24h),
  });

  return res.status(201).json(crypto);
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewestCryptos,
  createCrypto,
  validateCreateCryptoInput,
};
