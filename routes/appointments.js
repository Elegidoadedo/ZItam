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

router.post('/:id/:service/:employee', (req, res, next) => {
  const ClientId = req.session.currentUser._id;
  const {dateId} = req.body
  const professionalId = req.params.id
  const service = req.params.service
  const employee = req.params.employee
  
  Professional.findById(professionalId)
  .then(professional => {
    professional.services.forEach(item => {
      if(item.name === service){
        service = item
      }
    })
    professional.employees.forEach(item => {
      if(item.name === employee){
        item.timeBlock.forEach(b => {
          if(b.date === dateId){
            b.status = "block"
          }
        })
      }
    })
    professional.save()
    .then(result => {
      const newAppointment = new Appointment({ professional: ObjectId(professionalId), date: ObjectId(dateId), client: ObjectId(ClientId), service, employee })
    
      newAppointment.save()
      .then(result => {
        res.redirect(`/profile`);
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
  



});
module.exports = router;