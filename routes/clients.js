const express = require('express');
const router = express.Router();
const Client = require('../models/client')
const Professional = require('../models/professional')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares')

/* GET users listing. */
router.get('/add-favorite', middlewares.requireUser, (req, res, next) => {
  res.render('addfavorite')
});

router.post('/add-favorite', (req, res, next) => {
 const id = req.session.currentUser._id; 
  const {code} = req.body
  Client.findById(id)
  .then(client => {
    Professional.findOne({code})
    .then(professional => {
      if(!professional){
        req.flash('error', 'El profesional no existe')
        return res.redirect('/clients/add-favorite')
      }
      professionalId = professional._id

      client.myProfessionals.forEach(item => {
        if(professionalId.toString() === item._id.toString()){
          req.flash('error', 'Ya tienes añadido este profesional')
          return res.redirect('/clients/add-favorite')
        }
      })

      client.myProfessionals.push(ObjectId(professionalId))
      client.save()
      .then(succes => {
        req.flash('info', 'Añadido correctamente');
        return res.redirect('/clients/my-favorites');
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
})

router.get('/my-favorites', middlewares.requireUser, (req, res, next) => {
  const id = req.session.currentUser._id;

  Client.findById(id)
  .populate('myProfessionals')
  .then((user) => {
    res.render('my-favorites', { user })
  })
  .catch(next);
})
module.exports = router;
