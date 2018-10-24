const express = require('express');
const router = express.Router();
const Professional = require('../models/professional')
const Date = require('../models/date')
const middlewares = require('../middlewares/middlewares')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */

router.get('/signup',middlewares.requireAnon ,(req, res, next) => {
  res.render('signupprof')
})




router.post('/signup', middlewares.requireAnon, (req, res, next) => {
  const {username, password, email, code} = req.body;

  if ( !username || !password || !email ) {
    req.flash('error', 'all fields are required')
    return res.redirect('/signup')
  }

  Professional.findOne( {username} )
  .then(result => {
    if(result) {
      req.flash('error','username is already exist');
      return res.redirect('/signup');
    }
    Professional.findOne( {email} )
    .then(result => {
      if(result) {
        req.flash('error','email is already exist');
        return res.redirect('/signup');
      }
    })
    .catch(next)

    const salt  = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new Professional({ username, password: hashedPassword, email, role: "professional", code});

    newUser.save()
    .then(result => {
      // guardamos el usuario en la session
      req.session.currentUser = newUser;
      // redirect siempre con barra
      res.redirect(`/profile`);
    })
    .catch(next)
    
  })
  .catch(next)
});


router.get('/login',middlewares.requireAnon ,(req, res, next) => {
  res.render('loginprof')
})

router.post('/login', middlewares.requireAnon, (req, res, next) => {
  const { username, password} = req.body;

  if ( !username || !password ) {
    req.flash('error', 'Username or password are incorrect');
    return res.redirect('/login');
  }
  
  Professional.findOne({username})
  .then(user => {
    if(!user) {
      req.flash('error', 'Username or password are incorrect');
      return res.redirect('/login');
    }

    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Success
      // Adding user in session
      req.session.currentUser = user;
      res.redirect(`/profile`);
    } else {
      // No, no, no, no, prohibido
      req.flash('error', 'Username or password are incorrect');
      res.redirect('/login');
    }
  })
  .catch(next)
})



// First stage in the form employee selector

router.get('/:id/:service', (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;

 
  Professional.findById(id)
  .then(professional => {
    res.render ('employees', {professional, service: service})
  })
  .catch(next)

});

// Final Step in form, show timeblocking
router.get('/:id/:service/:employee', (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;
  const employee = req.params.employee;

  Professional.findOne({id: id, service: service, employee: employee})
  .then(professional => {
    res.render('timeblocking',{professional})
  })
  .catch(next)

});



// landing professional with form
router.get('/:id/', (req, res, next) => {
  const id = req.params.id;
 
  Professional.findById(id)
  .then(professional => {
    res.render ('profprofile', {professional})
  })
  .catch(next)

});


module.exports = router;