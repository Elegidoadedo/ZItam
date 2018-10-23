const express = require('express');
const router = express.Router();
const Professional = require('../models/professional')
const Date = require('../models/date')

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id

  Professional.findById(id)
  .populate('timeBlock')
  .then(professional => {
    res.render('profprofile',{professional})
  })
  .catch(next)

});

module.exports = router;