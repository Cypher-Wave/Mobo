import express from "express";
const CompanyRoutes = express.Router();
import CompanyController from "../controllers/CompanyController.js";

// Endpoint para listar todas as empresas
CompanyRoutes.get("/companies", CompanyController.getAllCompanies);

// Endpoint para cadastrar uma empresa
CompanyRoutes.post("/companies", CompanyController.createCompany);

// Endpoint para excluir uma empresa
CompanyRoutes.delete("/companies/:id", CompanyController.deleteCompany);

// Endpoint para alterar uma empresa
CompanyRoutes.put("/companies/:id", CompanyController.updateCompany);

// Endpoint para listar uma única empresa
CompanyRoutes.get("/companies/:id", CompanyController.getOneCompany);

export default CompanyRoutes;
