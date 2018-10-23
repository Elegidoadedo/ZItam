const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares')

/* GET users listing. */
router.get('/', middlewares.requireUser , (req, res, next) => {
  res.render('profile')
})

module.exports = router;
