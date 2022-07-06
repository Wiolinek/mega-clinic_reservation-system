var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* SEND reservation form. */

router.post('/', function(req, res, next) {
  let formData = req.body.formData;

  mysql.query("INSERT INTO reservations (speciality, doctor, date, time, pacientName, pacientEmail, pacientPhone) VALUES (?, ?, ?, ?, ?, ?, ?)", [formData.speciality, formData.doctor, formData.date, formData.time, formData.pacientName, formData.pacientEmail, formData.pacientPhone], function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
