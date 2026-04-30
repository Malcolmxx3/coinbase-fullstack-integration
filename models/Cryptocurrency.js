const mongoose = require('mongoose');

const { Schema } = mongoose;

const cryptocurrencySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Cryptocurrency name is required'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Cryptocurrency symbol is required'],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Cryptocurrency price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      trim: true,
    },
    change24h: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema);
