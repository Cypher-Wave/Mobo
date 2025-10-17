import flash from "express-flash";
import asyncHandler from "../../../api/src/utils/asyncHandler";
import authMiddleware from "../../../api/src/middleware/authMiddleware"
import CompanyService from "../../api/services/CompanyService.js";

class CompanyController {
  // Renderiza a página de Cadastro
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