import UserService from "../../services/UserService.js";
import CompanyService from "../../services/CompanyService.js"; 
import flash from "express-flash";
import session from "express-session";
import asyncHandler from "../../utils/asyncHandler.js";

class LoginController {
  // Renderizar a página de Login
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    const companies = await CompanyService.getAll();
    res.render("login", {
      user,
      companies,
      loggedOut: true,
      messages: req.flash(),
      pageTitle: "Login / Cadastro",
      cssPage: "login",
    });
  });

  // Efetuar a Autenticação e Logar
  authenticate = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;
    const result = await UserService.authenticate(userEmail, userPassword);
    if (result.success) {
      req.session.user = result.user;
      req.flash("success", "Login efetuado com sucesso!");
      return res.redirect("/home");
    } else {
      req.flash("danger", result.message);
      return res.redirect("/login");
    }
  });

  // Registrar o Usuário
  register = asyncHandler(async (req, res) => {
    const {
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails
    } = req.body;
    const userImage = req.file ? req.file.filename : null;
    const result = await UserService.create(
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails,
      userImage
    );
    if (result.success) {
      req.session.user = result.user;
      req.flash("success", "Cadastro realizado!.");
      return res.redirect("/home");
    } else {
      req.flash("danger", result.message);
      return res.redirect("/login");
    }
  });

  // Fazer Logout
  logout = asyncHandler(async (req, res) => {
    req.session.user = undefined;
    res.redirect("/login");
  });
}

export default new LoginController();
