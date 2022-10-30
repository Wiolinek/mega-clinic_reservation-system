const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* SEND reservation form. */

router.post('/', function(req, res, next) {
  let formData = req.body.values;

  mysql.query("INSERT INTO reservations (speciality, doctor, doctor_id, date, time, patientName, patientEmail, patientPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [formData.speciality, formData.doctor, formData.doctorId, formData.date, formData.time, formData.patientName, formData.patientEmail, formData.patientPhone], function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
