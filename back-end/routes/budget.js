const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');


router.post('/save', function (req, res, next) {
  const { budgetInfo } = req.body;
  console.log(budgetInfo, 'budgetInfo');
  const budgetDB = new Budget();

  budgetDB.tripId = budgetInfo.tripId;
  budgetDB.type = budgetInfo.type;
  budgetDB.title = budgetInfo.title;
  budgetDB.amount = budgetInfo.amount;
  budgetDB.amountType = budgetInfo.amountType;
  budgetDB.currency = budgetInfo.currency;
  budgetDB.category = budgetInfo.category;

  budgetDB.save(function (err, docsInserted) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ id: docsInserted._id });
  });
});

module.exports = router;
