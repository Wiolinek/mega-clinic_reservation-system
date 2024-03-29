const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    
  });
  res.redirect('/');
});

module.exports = router;