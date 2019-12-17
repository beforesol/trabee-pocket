const express = require('express');
const router = express.Router();
const MergeCountry = require('../models/mergeCountry');
const Country = require('../models/Country');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Country.find({}, function (err, countries) {
    if (err) return res.status(500).json({ error: err });
    if (!countries) return res.json({ error: 'countries not found' });
    res.json(countries);
  })
});

module.exports = router;
