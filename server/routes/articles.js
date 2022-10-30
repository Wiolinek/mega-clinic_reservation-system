const express = require('express');
const router = express.Router();

const mysql = require('./../lib/mysql')

/* GET specialities listing. */
router.post('/', function(req, res, next) {
  let page = req.body.page
  let lang = req.body.language

  mysql.query("SELECT * FROM articles WHERE page = " + '"' + page + '"' + " AND language = " + '"' + lang + '"', function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
