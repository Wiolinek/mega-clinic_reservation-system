const express = require('express');
const router = express.Router();
const Doctor = require('../lib/models/doctorSchema');
const passport = require ('passport');
const genPassword = require('../passport-config').genPassword;

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }

// router.get('/', checkAuthenticated, (req, res) => {
//   res.render('index.ejs', { name: req.user.name })
// })

// router.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('spróbuj ponownie')
// })

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

router.post('/', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}));


// router.post('/', (req, res, next) => {
//   const saltHash = genPassword(req.body.password);

//   const newDoctor = new Doctor({
//     username: req.body.username,
//     salt: saltHash.salt,
//     hash: saltHash.hash,
//   });

//   newDoctor.save()
//     .then(user => console.log(user));

//   res.redirect('/');
// });

// router.get('/', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// })

router.get('/', (req, res, next) => {
  res.send(req.user)
})

module.exports = router;