const express = require('express');
const router = express.Router();
const Client = require('../models/client')
const Professional = require('../models/professional')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/* GET users listing. */
router.get('/add-favorite', (req, res, next) => {
  res.render('addfavorite')
});

router.post('/add-favorite', (req, res, next) => {
  const id = req.params.id
  const {code} = req.body
  Client.findById(id)
  .populate('myProffesionals')
  .then(client => {
    Professional.findOne({code})
    .then(professional => {
      professionalId = professional._id
      client.myProfessionals.push(ObjectId(professionalId))
      client.save()
      .then(succes => {
        req.flash('info', 'Añadido correctamente');
        res.redirect('/clients/my-favorites');
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
})

router.get('/my-favorites', (req, res, next) => {
  const id = req.session.currentUser._id;

  Client.findById(id)
  .populate('myProfessionals')
  .then((user) => {
    res.render('my-favorites', { user })
  })
  .catch(next);
})
module.exports = router;
