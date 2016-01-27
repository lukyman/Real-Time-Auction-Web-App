var express = require('express');
var router = express();
var mainModel = require('../models/main');

router.get('/users/dash', function(req, res) {
  res.json(req.body);
});

module.exports = router;