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
      console.error("Erro em getAll User:", error);
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
      const existing = await User.findOne({ userEmail });
      if (existing) return { success: false, message: "Usuário já cadastrado." };
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
        userImage
      });
      await newUser.save();
      return { success: true };
    } catch (error) {
      console.error("Erro em create User:", error);
    }
  }

  // Função para deletar um usuário
  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`Usuário com a id: ${id} foi excluído.`);
    } catch (error) {
      console.error("Erro em delete User:", error);
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
        userImage
      });
      console.log(`Usuário com a id: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error("Erro em update User:", error);
    }
  }

  // Função para listar um único usuário
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.error("Erro em getOne User:", error);
    }
  }

  // Login do usuário
  async authenticate(email, password) {
    const user = await User.findOne({ userEmail: email, userPassword: password });
    if (!user) return { success: false, message: "Usuário não encontrado." };

    // const correct = await bcrypt.compare(password, user.userPassword);
    // if (!correct) return { success: false, message: "Senha incorreta." };

    return {
      success: true,
      user: {
        id: user._id,
        email: user.userEmail,
        role: user.userRole,
      },
    };
  }
}

export default new UserService();
