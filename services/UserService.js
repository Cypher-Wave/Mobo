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
      throw new Error("Erro ao listar usuários.");
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
    farmerDetails
  ) {
    try {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
      });
      await newUser.save();
    } catch (error) {
      console.error("Erro em create User:", error);
      throw new Error("Erro ao criar usuário.");
    }
  }

  // Função para deletar um usuário
  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`Usuário com a id: ${id} foi excluído.`);
    } catch (error) {
      console.error("Erro em delete User:", error);
      throw new Error("Erro ao exluir usuário.");
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
    farmerDetails
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
      });
      console.log(`Usuário com a id: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error("Erro em update User:", error);
      throw new Error("Erro ao atualizar usuário.");
    }
  }

  // Função para listar um único usuário
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.error("Erro em getOne User:", error);
      throw new Error("Erro ao listar usuário.");
    }
  }

  // Login do usuário
  async login(userEmail, userPassword) {
    try {
      const user = await User.findOne({ userEmail });
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }
      const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
      if (!isPasswordValid) {
        throw new Error("Senha incorreta.");
      }
      return user;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.message);
    }
  }
}

export default new UserService();
