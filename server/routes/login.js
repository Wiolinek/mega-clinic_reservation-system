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

router.post('/', passport.authenticate('local'), (req, res, next) => {

    if (!req?.user?.id) {
        res.status(401);
        return next(new Error("Unauthorized"));
    }

    res.json({id: req.user.id, name: req.user.name});

});

module.exports = router;