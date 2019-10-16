const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  const user = new User();

  user.name = req.body.user.name;
  user.id = req.body.user.id;

  user.save(function(err) {
    if (err) {
      console.log(err);
      res.json({result: 0});
      return;
    }
    res.json({result: 1});
  })
})

router.post('/checkUsers', function (req, res, next) {
  User.findOne({name: req.body.user.name}, function(err, user) {
    if (err) return res.status(500).json({error: err});
    if(!user) return res.json({error: 'user not found'});
    res.json(user);
  })
})

module.exports = router;
