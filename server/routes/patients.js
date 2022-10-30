const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* GET patients listing. */
router.post('/', function(req, res, next) {

  mysql.query("SELECT * FROM patients WHERE patientName LIKE '%" + req.body.patientName + "%'", function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
