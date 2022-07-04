var express = require('express');
var router = express.Router();

var mysql = require('./../lib/mysql')

/* GET doctors listing. */
// router.get('/', function(req, res, next) {
//   // mysql.query('SELECT * FROM doctors', function(error, result, fields) {
    
//     mysql.query("SELECT doctor_id, name, photo, description, speciality, working_hours_start, working_hours_end FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id ORDER BY doctor_id", function(error, result, fields) {
//       res.json(result);
//   });
// });

router.get('/', function(req, res, next) {
  mysql.query("SELECT * FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id", function(error, result, fields) {
    res.json(result);
  });
});

router.post('/', function(req, res, next) {
  let filterObject = "";
  if(req.body.specialityFilter !== null && req.body.specialityFilter !== "" ) {
    filterObject = req.body.specialityFilter;
  }

  mysql.query("SELECT * FROM specialities LEFT JOIN doctors_x_specialities ON specialities.id = doctors_x_specialities.speciality_id LEFT JOIN doctors ON doctors_x_specialities.doctor_id = doctors.id " + (filterObject !== null && "WHERE specialities.speciality = " + '"' + filterObject + '"'), function(error, result, fields) {
    res.json(result);
  });
});

module.exports = router;




// "SELECT * FROM teachers LEFT JOIN courses_x_teachers ON teachers.id = courses_x_teachers.teacher_id"

//"SELECT * FROM doctors LEFT JOIN doctors_x_specialities ON doctor.id = doctors_x_specialities.doctor_id"


  