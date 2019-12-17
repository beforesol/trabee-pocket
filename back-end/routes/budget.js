const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');

router.post('/save', function (req, res, next) {
  const { budgetInfo } = req.body;
  const budgetDB = new Budget();

  budgetDB.tripId = budgetInfo.tripId;
  budgetDB.type = budgetInfo.type;
  budgetDB.title = budgetInfo.title;
  budgetDB.amount = budgetInfo.amount;
  budgetDB.amountType = budgetInfo.amountType;
  budgetDB.currency = budgetInfo.currency;
  budgetDB.category = budgetInfo.category;
  budgetDB.day = budgetInfo.day;

  budgetDB.save(function (err, docsInserted) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ id: docsInserted._id });
  });
});

router.post('/', function (req, res, next) {
  const { id, type } = req.body;

  Budget.find({ tripId: id, type }, function (err, budgetData) {
    if (err) return res.status(500).json({ error: err });

    if (!budgetData) return res.json({ error: 'budgetData not found' });

    res.json(budgetData);
  })
});

module.exports = router;
