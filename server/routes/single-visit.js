const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* PATCH visit data. */
router.patch('/', function(req, res, next) {
  const { notes, visitId } = req.body;

  mysql.query("UPDATE reservations SET notes = " + `'${notes}'` + " WHERE id = " + visitId, function(error, result, fields) {
    res.json(result);
  });
});

/* POST visit data. */
router.post('/', function(req, res, next) {
  const { visitId } = req.body;

  mysql.query("SELECT * FROM reservations WHERE id = " + visitId, function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
