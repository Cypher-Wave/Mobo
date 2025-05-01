import UserService from "../../services/UserService.js";
import flash from "express-flash";
import session from "express-session";

// Renderizar a página de Login
const renderLogin = async(req, res) => {
    try {
        res.render("login", {
          loggedOut: true,
          messages: req.flash(),
          pageTitle: "Login / Cadastro",
          cssPage: "login",
        });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao carregar página de login / cadastro" });
    }
}

// Efetuar a Autenticação e Logar 
const login = async(req, res) => {
  try {
      const { email, password } = req.body;
      const result = await UserService.authenticate(email, password);
      if (result.success) {
        req.session.user = result.user;
        req.flash("success", "Login efetuado com sucesso!");
        return res.redirect("/home");
      } else {
        req.flash("danger", result.message);
        return res.redirect("/login");
      }
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
}

// Registrar o Usuário 
const register = async(req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, userRole, company, farmerDetails } = req.body;
    const userImage = req.file ? req.file.filename : null;
    const userData = {
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails,
      userImage
    };
    const result = await UserService.create(userData);
    if (result.success) {
      req.session.user = result.user;
      req.flash("success", "Cadastro realizado!.");
      return res.redirect("/home");
    } else {
      req.flash("danger", result.message);
      return res.redirect("/login");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Fazer Logout 
const logout = async(req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
}

export default { renderLogin, register, login, logout };