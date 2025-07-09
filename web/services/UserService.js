<<<<<<< HEAD:web/services/UserService.js
import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserService {
  // Função para listar todos os usuários
  async getAll(companyId = null) {
    try {
      const query = companyId ? { company: companyId } : {}; // Se tiver companyId, filtra, senão traz todos
      const users = await User.find(query);
      return users;
    } catch (error) {
      console.log("Erro em getAll User:", error);
    }
  }

  // Função para cadastrar um usuário
  async create(
    userName,
    userEmail,
    userPassword,
    userPhone,
    userRole,
    company,
    farmerDetails,
    userImage
  ) {
    try {
      if (!userName || !userEmail || !userPassword || !userRole)
        return {
          success: false,
          message: "Campos obrigatórios não preenchidos.",
        };
      let parsedFarmerDetails = undefined;
      if (userRole === "family_farmer") {
        if (!farmerDetails || !farmerDetails.cpf || !farmerDetails.dap) {
          return { success: false, message: "Campos CPF e DAP são obrigatórios para agricultores familiares." };
        }
        parsedFarmerDetails = {
          cpf: farmerDetails.cpf,
          dap: farmerDetails.dap,
        };
      };
      const existing = await User.findOne({ userEmail });
      if (existing)
        return { success: false, message: "Usuário já cadastrado." };

      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userPhone,
        userRole,
        company,
        farmerDetails: parsedFarmerDetails,
        userImage,
      });
      await newUser.save();
      return {
        success: true,
        message: "Usuário criado com sucesso.",
        user: {
          id: newUser._id,
          userImage: newUser.userImage,
          userName: newUser.userName,
          userEmail: newUser.userEmail,
          userRole: newUser.userRole,
          company: newUser.company,
        },
      };
    } catch (error) {
      console.log("Erro em create User:", error);
      return { success: false, message: "Erro ao criar usuário." };
    }
  }

  // Função para deletar um usuário
  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`Usuário com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log("Erro em delete User:", error);
    }
  }

  // Função para atualizar um usuário
  async update(
    id,
    userName,
    userEmail,
    userPassword,
    userPhone,
    userRole,
    company,
    farmerDetails,
    userImage
  ) {
    try {
      if (userPassword) {
        userPassword = await bcrypt.hash(userPassword, 10);
      }
      await User.findByIdAndUpdate(id, {
        userName,
        userEmail,
        userPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
        userImage,
      });
      console.log(`Usuário com a id: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.log("Erro em update User:", error);
    }
  }

  // Função para listar um único usuário
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log("Erro em getOne User:", error);
    }
  }

  // Login do usuário
  async authenticate(userEmail, userPassword) {
    const user = await User.findOne({ userEmail });
    if (!user) return { success: false, message: "Usuário não encontrado." };

    const correct = await bcrypt.compare(userPassword, user.userPassword);
    if (!correct) return { success: false, message: "Senha incorreta." };

    return {
      success: true,
      message: "Login efetuado com sucesso!",
      user: {
        id: user._id,
        userImage: user.userImage,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
        company: user.company,
      },
    };
  }
}

export default new UserService();
=======
import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserService {
  // Função para listar todos os usuários
  async getAll(companyId = null) {
    try {
      const query = companyId ? { company: companyId } : {}; // Se tiver companyId, filtra, senão traz todos
      const users = await User.find(query);
      return users;
    } catch (error) {
      console.log("Erro em getAll User:", error);
    }
  }

  // Função para cadastrar um usuário
  async create(
    userName,
    userEmail,
    userPassword,
    userPhone,
    userRole,
    company,
    farmerDetails,
    userImage
  ) {
    try {
      if (!userName || !userEmail || !userPassword || !userRole)
        return {
          success: false,
          message: "Campos obrigatórios não preenchidos.",
        };
      let parsedFarmerDetails = undefined;
      if (userRole === "family_farmer") {
        if (!farmerDetails || !farmerDetails.cpf || !farmerDetails.dap) {
          return { success: false, message: "Campos CPF e DAP são obrigatórios para agricultores familiares." };
        }
        parsedFarmerDetails = {
          cpf: farmerDetails.cpf,
          dap: farmerDetails.dap,
        };
      };
      const existing = await User.findOne({ userEmail });
      if (existing)
        return { success: false, message: "Usuário já cadastrado." };

      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userPhone,
        userRole,
        company,
        farmerDetails: parsedFarmerDetails,
        userImage,
      });
      await newUser.save();
      return {
        success: true,
        message: "Usuário criado com sucesso.",
        user: {
          id: newUser._id,
          userImage: newUser.userImage,
          userName: newUser.userName,
          userEmail: newUser.userEmail,
          userRole: newUser.userRole,
          company: newUser.company,
        },
      };
    } catch (error) {
      console.log("Erro em create User:", error);
      return { success: false, message: "Erro ao criar usuário." };
    }
  }

  // Função para deletar um usuário
  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`Usuário com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log("Erro em delete User:", error);
    }
  }

  // Função para atualizar um usuário
  async update(
    id,
    userName,
    userEmail,
    userPassword,
    userPhone,
    userRole,
    company,
    farmerDetails,
    userImage
  ) {
    try {
      if (userPassword) {
        userPassword = await bcrypt.hash(userPassword, 10);
      }
      await User.findByIdAndUpdate(id, {
        userName,
        userEmail,
        userPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
        userImage,
      });
      console.log(`Usuário com a id: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.log("Erro em update User:", error);
    }
  }

  // Função para listar um único usuário
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log("Erro em getOne User:", error);
    }
  }

  // Login do usuário
  async authenticate(userEmail, userPassword) {
    const user = await User.findOne({ userEmail });
    if (!user) return { success: false, message: "Usuário não encontrado." };

    const correct = await bcrypt.compare(userPassword, user.userPassword);
    if (!correct) return { success: false, message: "Senha incorreta." };

    return {
      success: true,
      message: "Login efetuado com sucesso!",
      user: {
        id: user._id,
        userImage: user.userImage,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
        company: user.company,
      },
    };
  }
}

export default new UserService();
>>>>>>> a7f7c0be574e8328db0fc6f347c5d732373fbadb:services/UserService.js
