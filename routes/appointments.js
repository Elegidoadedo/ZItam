const express = require('express');
const router = express.Router();
const Date = require('../models/date')
const Appointment = require('../models/appointment')
const Professional = require('../models/professional')
const Client = require('../models/client')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/:id', (req, res, next) => {
  const ClientId = req.session.currentUser._id;
  const {dateId} = req.body
  const professionalId = req.params.id

  const newAppointment = new Appointment({ professional: ObjectId(professionalId), date: ObjectId(dateId), client: ObjectId(ClientId) })

  newAppointment.save()
    .then(result => {
      res.redirect(`/profile`);
    })
    .catch(next)
});
module.exports = router;