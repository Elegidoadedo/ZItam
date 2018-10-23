const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  res.render('profile')
})

module.exports = router;