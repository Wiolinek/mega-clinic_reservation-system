const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({'id': req.user._id, 'name': req.user.name})
})

router.get('/me', (req, res, next) => {

  if (!req?.user?.id) {
      res.status(401);
      return next(new Error("Unauthorized"));
  }

  res.json({id: req.user.id, name: req.user.name});
})

module.exports = router;