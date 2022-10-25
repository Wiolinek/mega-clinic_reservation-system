var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* GET pacients listing. */
router.post('/', function(req, res, next) {

  mysql.query("SELECT * FROM pacients WHERE pacientName LIKE '%" + req.body.pacientName + "%'", function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;
