const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

router.post('/', function (req, res, next) {
  const userId = req.body.userId;

  Trip.find({ userId }, function (err, tripData) {
    if (err) return res.status(500).json({ error: err });

    if (!tripData) return res.json({ error: 'trip not found' });

    res.json(tripData);
  })
});

module.exports = router;
