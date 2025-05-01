import mongoose from "mongoose";

// Schema para detalhes específicos de agricultores familiares
const FarmerDetailsSchema = new mongoose.Schema({
  cpf: String,
  dap: String, // Declaração de Aptidão ao Pronaf (documento obrigatório)
});

const HarvestImagesSchema = new mongoose.Schema({
  imageName: String,
});

// Schema principal de usuários
const UserSchema = new mongoose.Schema(
  {
    // Dados básicos de autenticação
    userImage: String,
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true },
    // Informações opcionais
    userPhone: String,
    // Controle de acesso (roles)
    userRole: {
      type: String,
      enum: ["family_farmer", "company_admin", "company_worker"],
      required: true,
    },
    // Relacionamentos condicionais
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: function () {
        return this.userRole !== "family_farmer";
      },
    },
    // Detalhes específicos para agricultores familiares
    farmerDetails: {
      type: FarmerDetailsSchema,
      function () {
        return this.userRole === "family_farmer";
      },
    },
  },
  { timestamps: true }
);

// Método para ocultar a senha nas respostas da API
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.userPassword; // Remove o campo sensível
  return userObject;
};

// Compilando o modelo e criando a collection users
const User = mongoose.model("User", UserSchema);

export default User;
