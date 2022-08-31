var mysql = require('mysql');


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '2200',
  database        : 'reservation_system'
});

console.log('connected to MySQL')


module.exports = pool;