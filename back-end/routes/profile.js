const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

router.post('/', function(req, res, next) {
  const id = req.body.id;
  const userId = req.body.userId;

  Trip.findOne({ _id: id, userId }, function(err, tripData) {
    if (err) return res.status(500).json({ error: err });

    if(!tripData) return res.json({error: 'trip not found'});

    res.json(tripData);
  })
});

router.post('/save', function(req, res, next) {
  const { currentTripInfo, userId } = req.body;

  if (currentTripInfo.id) {
    // edit
    Trip.findByIdAndUpdate(currentTripInfo.id, currentTripInfo, { new: false }, function(err, docsInserted) {
      if (err) {
        return res.status(500).json({error: err});
      }

      res.json({id: docsInserted._id});
    })
  } else {
    const tripDB = new Trip();

    tripDB.userId = userId;
    tripDB.title = currentTripInfo.title;
    tripDB.memo = currentTripInfo.memo;
    tripDB.imageUrl = '';
    tripDB.country = currentTripInfo.country;
    tripDB.startDate = currentTripInfo.startDate;
    tripDB.endDate = currentTripInfo.endDate;
    tripDB.budgets = {};
   
    tripDB.save(function(err, docsInserted) {
      if (err) {
        return res.status(500).json({error: err});
      }

      res.json({id: docsInserted._id});
    });
  }
});

router.post('/delete', function(req, res, next) {
  const { userId, id } = req.body;

  Trip.remove({ _id: id, userId }, function(err, output) {
    if (err) {
      console.log(err);
      return res.status(404).json({error: err});
    }

    res.json({ message: "trip deleted" });
  })
});

module.exports = router;
