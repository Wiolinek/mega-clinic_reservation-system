var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* GET doctor visits listing. */

router.post('/', function(req, res, next) {
  let filter = req.body.doctorId
  let dateFilter = req.body.dateFilter;

  mysql.query("SELECT * FROM reservations WHERE doctor_id = " + '"' + filter + '"' + (dateFilter !== null ? (" AND date = " + '"' + dateFilter + '"') : ''), function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;