const express = require('express');
const router = express.Router();

const path = require('path');
const Country = require(path.join(__dirname, '../models/country'));

/* GET users listing. */
router.post('/', function (req, res, next) {
  Country.find({}, function (err, countries) {
    if (err) return res.status(500).json({ error: err });
    if (!countries) return res.json({ error: 'countries not found' });
    res.json(countries);
  })
});

module.exports = router;
