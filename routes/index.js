const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Client = require('../models/client')
const Professional = require('../models/professional')
const saltRounds = 10;
const middlewares = require('../middlewares/middlewares')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup')
});

router.post('/signup', (req, res, next) => {
  const {username, password, email, role} = req.body;
  let collection;

  if ( !username || !password || !email ) {
    req.flash('error', 'all fields are required')
    return res.redirect('/signup')
  }

  if(role === "client"){
    collection = Client
  } else {
    collection = Professional
  }

  collection.findOne( {username} )
  .then(result => {
    if(result) {
      req.flash('error','username is already exist');
      return res.redirect('/signup');
    }
    collection.findOne( {email} )
    .then(result => {
      if(result) {
        req.flash('error','email is already exist');
        return res.redirect('/signup');
      }
    })
    .catch(next)

    const salt  = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new collection({ username, password: hashedPassword, email, role});

    newUser.save()
    .then(result => {
      // guardamos el usuario en la session
      req.session.currentUser = newUser;
      // redirect siempre com barra
      res.redirect(`/${newUser._id}/profile`);
    })
    .catch(next)
    
  })
  .catch(next)
});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.post('/login', (req, res, next) => {
  const { username, password, role } = req.body;
  console.log(req.body)
  let collection;
  if ( !username || !password ) {
    req.flash('error', 'Username or password are incorrect');
    return res.redirect('/login');
  }
  
  if(role === "client"){
    collection = Client
  } else {
    collection = Professional
  }

  collection.findOne({username})
  .then(user => {
    if(!user) {
      req.flash('error', 'Username or password are incorrect');
      return res.redirect('/login');
    }

    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Success
      // Adding user in session
      req.session.currentUser = user;
      res.redirect(`/${user._id}/profile`);
    } else {
      // No, no, no, no, prohibido
      req.flash('error', 'Username or password are incorrect');
      res.redirect('/login');
    }
  })
  .catch(next)
})


router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => next(err));
  res.redirect('/');
});

module.exports = router;
