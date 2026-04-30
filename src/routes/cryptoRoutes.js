const express = require('express');
const {
  getAllCryptos,
  getTopGainers,
  getNewestCryptos,
  createCrypto,
} = require('../controllers/cryptoController');

const router = express.Router();

router.get('/api/crypto', getAllCryptos);
router.get('/api/crypto/gainers', getTopGainers);
router.get('/api/crypto/new', getNewestCryptos);
router.post('/api/crypto', createCrypto);

module.exports = router;
