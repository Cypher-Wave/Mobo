import Company, { ICompany } from "../models/Company";

// Interface para entrada de dados de empresa
export interface CompanyInput {
  companyCNPJ: string;
  ownerName: string;
  companyName?: string;
  subscriptionPlan?: ICompany["subscriptionPlan"];
  companyAddress?: ICompany["companyAddress"];
}

// Serviço para gerenciar empresas
class CompanyService {
  // Listar todas as empresas
  async getAll(): Promise<ICompany[]> {
    return await Company.find();
  }

  // Criar uma empresa
  async create(data: CompanyInput): Promise<ICompany> {
    const newCompany = new Company(data);
    await newCompany.save();
    return newCompany;
  }

  // Atualizar empresa
  async update(id: string, data: CompanyInput): Promise<ICompany | null> {
    return await Company.findByIdAndUpdate(id, data, { new: true });
  }

  // Deletar empresa
  async delete(id: string): Promise<void> {
    await Company.findByIdAndDelete(id);
  }

  // Buscar uma empresa específica
  async getOne(id: string): Promise<ICompany | null> {
    return await Company.findById(id);
  }
}

export default new CompanyService();
