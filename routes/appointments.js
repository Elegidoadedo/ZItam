const express = require('express');
const router = express.Router();
const DateModel = require('../models/dateModel')
const Appointment = require('../models/appointment')
const Professional = require('../models/professional')
const Client = require('../models/client')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares')

/* GET users listing. */
router.get('/', middlewares.requireUser, (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/:id/:service/:employee', middlewares.requireUser, (req, res, next) => {
  const currentUser = req.session.currentUser
  const ClientId = req.session.currentUser._id;
  const {dateId,nameClient} = req.body
  const professionalId = req.params.id
  let service = req.params.service
  const employee = req.params.employee
  let name = null

  if(!dateId){
    req.flash('error', 'Seleccione hora')
    return res.redirect(`/professionals/${professionalId}/${service}/${employee}`)
  }

  if(currentUser.role === "client"){
    name =  ObjectId(ClientId)
  } else if(currentUser.role === "professional"){
    if(!nameClient){
      req.flash('error', 'Introduzca un nombre')
      return res.redirect(`/professionals/${professionalId}/${service}/${employee}`)
    }
  }

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
          const idx = b.date.toString()
          if(idx === dateId){
            b.status = "block"
          }
        })
      }
    })
    professional.save()
    .then(result => {
      const newAppointment = new Appointment({ professional: ObjectId(professionalId), date: ObjectId(dateId), client: name, service, employee, nameClient: nameClient })
    
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

router.post('/delete/:id', middlewares.requireUser, (req, res, next) => {

  const appointmentId = req.params.id
  
  Appointment.findById(appointmentId)
  .then(appointment => {
    professionalId = appointment.professional.toString()
    
    Professional.findById(professionalId)
    .then(professional => {
      
      professional.employees.forEach(item => {
        if(item.name === appointment.employee){
          item.timeBlock.forEach(b => {
            const idx = b.date.toString()
            if(idx === appointment.date.toString()){
              b.status = "free"
            }
          })
        }
      })
      professional.save()
      .then(result => {
        Appointment.findByIdAndDelete(appointmentId)
        .then(result => {
          res.redirect(`/profile`);
        })
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)  
  })
  .catch(next)
});
  
  module.exports = router;
  
