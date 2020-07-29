const express = require('express');
const router = express.Router();

const path = require('path');
const Budget = require(path.join(__dirname, '../models/budget'));

router.post('/save', function (req, res, next) {
  const { budgetInfo } = req.body;

  if (budgetInfo.id) {
    // edit
    Budget.findByIdAndUpdate(budgetInfo.id, budgetInfo, { new: false }, function (err, docsInserted) {
      if (err) {
        return res.status(500).json({ error: err });
      }

      res.json({ id: docsInserted._id });
    })

    console.log('budget Edit');
  } else {
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

    console.log('budget New');
  }
});

router.post('/', function (req, res, next) {
  const { id } = req.body;

  Budget.find({ tripId: id }, function (err, budgetData) {
    if (err) return res.status(500).json({ error: err });

    if (!budgetData) return res.json({ error: 'budgetData not found' });

    res.json(budgetData);
  })
});

module.exports = router;
