const asyncHandler = require('express-async-handler');
const Quote = require('../models/Quote');

// @desc      Get all quotes
// @route     GET /api/v1/quotes
// @access    Public

exports.getQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find({});
  res.status(200).json(quotes);
});

// @desc      create quote
// @route     POST /api/v1/quotes
// @access    Public

exports.createQuote = asyncHandler(async (req, res) => {
  const newQuote = {
    author: req.body.author,
    quote: req.body.quote,
  };
  const quote = await Quote.create(newQuote);
  res.status(200).json(quote);
});
