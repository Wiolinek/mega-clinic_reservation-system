const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* GET doctor visits listing. */

router.post('/', function(req, res, next) {
  let doctorFilter = req.body.doctorId ? `doctor_id = '${req.body.doctorId}'` : null;
  let dateFilter = req.body.date ? `date = '${req.body.date}'` : null;
  let visitFilter = req.body.visitId ? `id = '${req.body.visitId}'` : null;

  const filtersArr = [doctorFilter, dateFilter, visitFilter].filter(Boolean)
  const filters = filtersArr.join(" AND ")

  mysql.query("SELECT * FROM reservations WHERE " + (filtersArr.length > 0 && filters), function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;