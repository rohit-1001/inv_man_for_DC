const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    item: String,
    price: String,
  });
  
  const PriceModel = mongoose.model('Price', priceSchema);
  module.exports = PriceModel;