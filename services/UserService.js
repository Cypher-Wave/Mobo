import User from "../models/User.js";

class UserService {
  // Função para listar todos os usuários
  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
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
      const newUser = new User({
        userName,
        userEmail,
        userPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar um usuário
  async delete(id) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`Usuário com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  // Função para listar um único usuário
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
