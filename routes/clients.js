const express = require('express');
const router = express.Router();
const Client = require('../models/client')
const Professional = require('../models/professional')

/* GET users listing. */
router.get('/:id/favorite', (req, res, next) => {
  res.render('addfavorite')
});

router.post('/:id/favorite', (req, res, next) => {
  const id = req.params.id
  const {code} = req.body
  Client.findById(id)
  .then(client => {
    Professional.findOne({code})
    .then(professional => {
      client.myProfessionals.push(professional)
      res.redirect('/clients/my-favorites')
    })
    .catch(next)
  })
  .catch(next)
})

router.get('/my-favorites', (req, res, next) => {
  res.render('my-favorites')
})
module.exports = router;
