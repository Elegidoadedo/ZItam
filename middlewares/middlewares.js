function requireUser(req, res, next) {
  const user = req.session.currentUser;

  if (!user) {
    return res.redirect('/auth/login')
  } else {
    next();
  }
}



module.exports = {
  requireUser,
}