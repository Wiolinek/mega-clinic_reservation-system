const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* GET specialities listing. */
router.get('/', function(req, res, next) {
  mysql.query('SELECT * FROM specialities', function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
