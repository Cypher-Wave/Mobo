import CompanyService from "../../services/CompanyService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de empresa
// Segue o padrão REST com tratamento centralizado de erros
const getAllCompanies = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const companies = await CompanyService.getAll();
    res.status(200).json({ companies: companies }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllCompanies:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createCompany = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const {
      companyCNPJ,
      ownerName,
      companyName,
      subscriptionPlan,
      companyAddress,
    } = req.body;
    await CompanyService.create(
      companyCNPJ,
      ownerName,
      companyName,
      subscriptionPlan,
      companyAddress
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createCompany:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteCompany = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await CompanyService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteCompany:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateCompany = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        companyCNPJ,
        ownerName,
        companyName,
        subscriptionPlan,
        companyAddress,
      } = req.body;
      CompanyService.update(
        id,
        companyCNPJ,
        ownerName,
        companyName,
        subscriptionPlan,
        companyAddress
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateCompany:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneCompany = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const company = await CompanyService.getOne(id);
      if (!company) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ company }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneCompany:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
  getOneCompany,
};
