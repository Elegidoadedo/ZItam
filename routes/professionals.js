const express = require('express');
const router = express.Router();
const Professional = require('../models/professional')
const DateModel = require('../models/dateModel')
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
    return res.redirect('/professionals/signup')
  }

  Professional.findOne( {username} )
  .then(result => {
    if(result) {
      req.flash('error','username is already exist');
      return res.redirect('/professionals/signup');
    }
    Professional.findOne( {email} )
    .then(result => {
      if(result) {
        req.flash('error','email is already exist');
        return res.redirect('/professionals/signup');
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
    return res.redirect('/professionals/login');
  }
  
  Professional.findOne({username})
  .then(user => {
    if(!user) {
      req.flash('error', 'Username or password are incorrect');
      return res.redirect('/professionals/login');
    }

    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Success
      // Adding user in session
      req.session.currentUser = user;
      res.redirect(`/profile`);
    } else {
      // No, no, no, no, prohibido
      req.flash('error', 'Username or password are incorrect');
      res.redirect('/professionals/login');
    }
  })
  .catch(next)
})



// First stage in the form employee selector

router.get('/:id/:service', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;

 
  Professional.findById(id)
  .then(professional => {
    res.render ('employees', {professional, service: service})
  })
  .catch(next)

});

// Final Step in form, show timeblocking
router.get('/:id/:service/:employee', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const service = req.params.service;
  const employee = req.params.employee;
  let timeblock =[];

  Professional.findById(id)
  .populate('employees.timeBlock.date')
  .then(professional => {
    professional.employees.forEach(emp =>{
      if( emp.name === employee){
       timeblock = emp.timeBlock
          
      
      }
    })
    res.render('timeblocking',{timeblock, service:service, employee:employee, idprof:id})
  })
  .catch(next)

});




// landing professional with form
router.get('/:id/', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
 
  Professional.findById(id)
  .then(professional => {
    res.render ('profprofile', {professional})
  })
  .catch(next)

});


module.exports = router;