import Company from "../models/Company.js";

class CompanyService {
  // Função para listar todas as empresas
  async getAll() {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar uma empresa
  async create(
    companyCNPJ,
    ownerName,
    companyName,
    subscriptionPlan,
    companyAddress
  ) {
    try {
      const newCompany = new Company({
        companyCNPJ,
        ownerName,
        companyName,
        subscriptionPlan,
        companyAddress,
      });
      await newCompany.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar uma empresa
  async delete(id) {
    try {
      await Company.findByIdAndDelete(id);
      console.log(`Empresa com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para atualizar uma empresa
  async update(
    id,
    companyCNPJ,
    ownerName,
    companyName,
    subscriptionPlan,
    companyAddress
  ) {
    try {
      await Company.findByIdAndUpdate(id, {
        companyCNPJ,
        ownerName,
        companyName,
        subscriptionPlan,
        companyAddress,
      });
      console.log(`Empresa com a id: ${id} atualizada com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar uma única empresa
  async getOne(id) {
    try {
      const company = await Company.findOne({ _id: id });
      return company;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CompanyService();
