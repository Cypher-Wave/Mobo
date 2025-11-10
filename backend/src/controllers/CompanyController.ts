import { Request, Response } from "express";
import CompanyService, { CompanyInput } from "../services/CompanyService";
import asyncHandler from "../utils/asyncHandler";

// Controller de empresas com asyncHandler
class CompanyController {
  // Listar todas as empresas
  getAllCompanies = asyncHandler(async (req: Request, res: Response) => {
    const companies = await CompanyService.getAll();
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma empresa encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      companies,
    });
  });

  // Criar empresa
  createCompany = asyncHandler(async (req: Request, res: Response) => {
    const companyData: CompanyInput = req.body;

    if (!companyData.companyCNPJ || !companyData.ownerName || !companyData.companyName) {
      return res.status(400).json({
        success: false,
        message:
          "Campos obrigatórios ausentes: CNPJ, nome da empresa ou responsável.",
      });
    }

    const newCompany = await CompanyService.create(companyData);

    if (!newCompany) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível criar a empresa.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Empresa criada com sucesso.",
      newCompany,
    });
  });

  // Atualizar empresa
  updateCompany = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const companyData: CompanyInput = req.body;

    const updatedCompany = await CompanyService.update(id, companyData);

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Empresa não encontrada ou não pôde ser atualizada.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Empresa atualizada com sucesso.",
      updatedCompany,
    });
  });

  // Deletar empresa
  deleteCompany = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    await CompanyService.delete(id);
    return res
      .status(200)
      .json({ success: true, message: "Empresa deletada com sucesso." });
  });

  // Buscar uma empresa
  getOneCompany = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const company = await CompanyService.getOne(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Empresa não encontrada." });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  });
}

export default new CompanyController();
