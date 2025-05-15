import flash from "express-flash";
import session from "express-session";
import asyncHandler from "../../utils/asyncHandler.js";

class CompanyController {
  // Renderizar a página de Login
  render = asyncHandler(async (req, res) => {
    res.render("companyRegister", {
      loggedOut: true,
      messages: req.flash(),
      pageTitle: "Cadastro de Empresa",
      cssPage: "companyRegister",
    });
  });
}

export default new CompanyController();