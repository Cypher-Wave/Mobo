import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken, IUserPayload } from "../utils/jwt";

// Tipo para detalhes específicos de agricultores familiares
interface FarmerDetails {
  cpf: string;
  dap: string;
}

// Interface para entrada de dados de usuário
export interface UserInput {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone?: string;
  userRole: "family_farmer" | "company_admin" | "company_worker";
  company?: string;
  farmerDetails?: FarmerDetails;
  userImage?: string;
}

// Tipo para o resultado da criação do usuário
interface CreateUserResult {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    userImage?: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    userRole: string;
    company?: string;
    farmerDetails?: FarmerDetails;
  };
}

// Serviço de Usuário
class UserService {
  // Listar todos os usuários de uma Empresa
  async getAll(companyId?: string) {
    const query = companyId ? { company: companyId } : {};
    return await User.find(query);
  }

  // Criar um novo usuário
  async create(data: UserInput): Promise<CreateUserResult> {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userRole,
        farmerDetails,
        company,
        userPhone,
        userImage,
      } = data;
      // Verificação de campos obrigatórios
      if (!userName || !userEmail || !userPassword || !userRole) {
        return {
          success: false,
          message: "Campos obrigatórios não preenchidos.",
        };
      }
      // Preenchendo o campo farmerDetails se userRole = "family_farmer"
      let parsedFarmerDetails: FarmerDetails | undefined;
      if (userRole === "family_farmer") {
        if (!farmerDetails?.cpf || !farmerDetails?.dap) {
          return {
            success: false,
            message:
              "Campos CPF e DAP são obrigatórios para agricultores familiares.",
          };
        }
        parsedFarmerDetails = {
          cpf: farmerDetails.cpf,
          dap: farmerDetails.dap,
        };
      }
      // Verificando se o email cadastrado já existe
      const existing = await User.findOne({ userEmail });
      if (existing) {
        return { success: false, message: "Usuário já cadastrado." };
      }
      // Cadastrando usuário
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const newUser = new User({
        userName,
        userEmail: userEmail.toLowerCase().trim(),
        userPassword: hashedPassword,
        userRole,
        userPhone,
        userImage,
        company,
        farmerDetails: parsedFarmerDetails,
      });
      await newUser.save();
      const newUserId = newUser._id ? newUser._id.toString() : "";
      const payload: IUserPayload = {
        id: newUserId,
        userRole: newUser.userRole as
          | "family_farmer"
          | "company_admin"
          | "company_worker",
        company: newUser.company as string | undefined,
      };

      const token = generateToken(payload);

      return {
        success: true,
        message: "Usuário criado com sucesso.",
        token,
        user: {
          id: newUserId,
          userImage: newUser.userImage,
          userName: newUser.userName,
          userEmail: newUser.userEmail,
          userPhone: newUser.userPhone,
          userRole: newUser.userRole,
          company: newUser.company?.toString(),
          farmerDetails: newUser.farmerDetails,
        },
      };
    } catch (error) {
      console.error("Erro em create UserService:", error);
      return { success: false, message: "Erro ao criar usuário." };
    }
  }

  // Atualizar usuário
  async update(id: string, data: Partial<UserInput>) {
    try {
      const updateData: any = { ...data };
      if (data.userPassword) {
        updateData.userPassword = await bcrypt.hash(data.userPassword, 10);
      }

      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error("Erro em update UserService:", error);
      throw error;
    }
  }

  // Deletar usuário
  async delete(id: string) {
    await User.findByIdAndDelete(id);
  }

  // Buscar um usuário específico
  async getOne(id: string) {
    return await User.findById(id).select("-userPassword");
  }

  // Autenticar usuário
  async authenticate(data: {
    userEmail: string;
    userPassword: string;
  }): Promise<CreateUserResult> {
    try {
      const { userEmail, userPassword } = data;

      const user = await User.findOne({
        where: { userEmail: userEmail.toLowerCase().trim() },
      });
      if (!user) return { success: false, message: "Usuário não encontrado." };

      const correct = await bcrypt.compare(userPassword, user.userPassword);
      if (!correct) return { success: false, message: "Senha incorreta." };

      const userId = user._id ? user._id.toString() : "";
      const payload: IUserPayload = {
        id: userId,
        userRole: user.userRole as
          | "family_farmer"
          | "company_admin"
          | "company_worker",
        company: user.company as string | undefined,
      };

      const token = generateToken(payload);

      return {
        success: true,
        message: "Login efetuado com sucesso!",
        token,
        user: {
          id: userId,
          userRole: user.userRole,
          company: user.company?.toString(),
        },
      };
    } catch (error) {
      console.error("Erro em authenticate UserService:", error);
      return { success: false, message: "Erro ao autenticar usuário." };
    }
  }
}

export default new UserService();
