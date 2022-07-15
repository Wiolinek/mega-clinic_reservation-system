const express = require('express');
const router = express.Router();
const passport = require ('passport');

//registration

// // router.post('/', (req, res, next) => {
// //   const saltHash = genPassword(req.body.password);

// //   const newDoctor = new Doctor({
// //     username: req.body.username,
// //     salt: saltHash.salt,
// //     hash: saltHash.hash,
// //   });

// //   newDoctor.save()
// //     .then(user => console.log(user));

// //   res.redirect('/');
// // });

router.post('/', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}));

router.get('/', (req, res, next) => {
  res.send({'id': res.user._id, 'name': req.user.name})
})

module.exports = router;