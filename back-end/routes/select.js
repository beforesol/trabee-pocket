const express = require('express');
const router = express.Router();
const MergeCountry = require('../models/mergeCountry');

/* GET users listing. */
router.get('/', function(req, res, next) {
  MergeCountry.find({}, function(err, mergecountries) {
    if (err) return res.status(500).json({error: err});
    if(!mergecountries) return res.json({error: 'countries not found'});
    res.json(mergecountries);
    console.log(mergecountries);
  })
});

router.post('/merge', function(req, res, next) {
  const countryMap = req.body.serverData;

  countryMap.forEach(map => {
    const countryDB = new MergeCountry();
 
    countryDB.continent = map.continent;
    countryDB.countries = map.countries;

    countryDB.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  })
});

module.exports = router;
