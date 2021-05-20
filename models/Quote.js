const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  author: String,
  quote: String,
});

module.exports = mongoose.model('Quote', QuoteSchema);
