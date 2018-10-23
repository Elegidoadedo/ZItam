function requireUser(req, res, next) {
  const user = req.session.currentUser;

  if (!user) {
    return res.redirect('/login')
  } else {
    next();
  }

}

function requireAnon(req, res, next) {
  const user = req.session.currentUser;

  if (user) {
    return res.redirect(`/profile`)
  } else {
    next();
  }
}

function requireClient(req, res, next) {
  const user = req.session.currentUser;

  if (!user.role === "client") {
    res.redirect('/login')
  } else {
    next();
  }
}

function requireProfessional(req, res, next) {
  const user = req.session.currentUser;

  if (!user.role === "professional") {
    res.redirect('/login')
  } else {
    next();
  }
}



module.exports = {
  requireUser,
  requireAnon,
  requireClient,
  requireProfessional,
}