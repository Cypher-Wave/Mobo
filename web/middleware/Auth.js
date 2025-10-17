function Auth(req, res, next) {
  if (req.session.user != undefined) {
    req.user = req.session.user;
    next();
  } else {
    res.redirect("/login");
  }
}

export default Auth;
