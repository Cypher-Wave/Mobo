function Auth(req, res, next) {
  if (req.session.user != undefined) {
    req.user = req.session.user;
    next();
  } else {
    res.render("login", {
      loggedOut: true,
      messages: req.flash(),
      pageTitle: "Login / Cadastro",
      cssPage: "login",
    });
  }
}

export default Auth;
