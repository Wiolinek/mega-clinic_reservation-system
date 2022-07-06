var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* GET timetable listing. */

router.post('/', function(req, res, next) {
  let filter = "";
  if(req.body.doctorFilter !== null && req.body.doctorFilter !== "" ) {
    filter = req.body.doctorFilter;
  }

  mysql.query("SELECT * FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id " + (filter !== null && "WHERE name = " + '"' + filter + '"'), function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;