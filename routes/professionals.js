const express = require('express');
const router = express.Router();
const Professional = require('../models/professional')
const Date = require('../models/date')

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Professional.findById(id)
  .populate('timeBlock.date')
  .then(professional => {
    res.render('profprofile',{professional})
  })
  .catch(next)

});
// First stage in the form service selector

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;

  Professional.find({id, service})
  .populate('timeBlock.date')
  .then(professional => {
    res.render (`/$(id)/$(service)/employees`, {professional})
  })
  .catch(next)

});
 

// Second stage in the form employee selector
router.get(`/$(id)/$(service)/employees`, (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;
  const employee = req.params.employee;

  Professional.find({id, service, employee})
  .populate('timeBlock.date')
  .then(professional => {
    res.render (`/$(id)/$(service)/employees/timeblock`, {professional})
  })
  .catch(next)

});

// Final Step in form, show timeblocking


module.exports = router;