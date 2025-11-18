import Company, { ICompany } from "../models/Company";

// Interface para entrada de dados de empresa
export interface CompanyInput {
  companyCNPJ: string;
  ownerName: string;
  companyName: string;
  subscriptionPlan?: ICompany["subscriptionPlan"];
  companyAddress?: ICompany["companyAddress"];
}

interface CreateCompany {
  success: boolean;
  message: string;
  company?: ICompany;
}

// Serviço para gerenciar empresas
class CompanyService {
  // Listar todas as empresas
  async getAll(): Promise<CreateCompany[]> {
    return await Company.find();
  }

  // Criar uma empresa
  async create(data: CompanyInput): Promise<CreateCompany> {
    try {
      if (!data.companyCNPJ || !data.ownerName || !data.companyName) {
        return {
          success: false,
          message: "Campos obrigatórios não preenchidos.",
        };
      }
      const newCompany = new Company(data);
      await newCompany.save();
      return {
        success: true,
        message: "Empresa criada com sucesso.",
        company: newCompany,
      };
    } catch (error) {
      console.error("Erro em create CompanyService:", error);
      return { success: false, message: "Erro ao criar empresa." };
    }
  }

  // Atualizar empresa
  async update(id: string, data: Partial<CompanyInput>): Promise<ICompany | null> {
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
