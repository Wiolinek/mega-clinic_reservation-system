var express = require('express');
var router = express.Router();

const Labels = require('../lib/models/labelsSchema');

/* GET labels. */

router.get('/', (req, res) => {
  Labels.find({}, (err, data) => {
    res.json(data);
  });
});


module.exports = router;