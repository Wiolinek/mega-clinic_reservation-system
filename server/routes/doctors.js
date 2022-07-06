var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* GET doctors listing. */

router.get('/', function(req, res, next) {
  mysql.query("SELECT * FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id", function(error, result, fields) {
    res.json(result);
  });
});

/* GET doctors filtered listing. */

router.post('/', function(req, res, next) {
  let filter = "";
  if(req.body.specialityFilter !== null && req.body.specialityFilter !== "" ) {
    filter = req.body.specialityFilter;
  }

  mysql.query("SELECT * FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id " + (filter !== null && "WHERE specialities.speciality = " + '"' + filter + '"'), function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;