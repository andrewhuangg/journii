const express = require('express');
const { getQuotes, createQuote } = require('../controllers/quotes');

const router = express.Router();

router.route('/').get(getQuotes).post(createQuote);

module.exports = router;
