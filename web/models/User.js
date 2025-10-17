import mongoose from "mongoose";

// Schema para detalhes específicos de agricultores familiares
const FarmerDetailsSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v), // Formato 000.000.000-00
      message: "CPF inválido!",
    },
  },
  dap: {
    type: String,
    required: true,
    minlength: 10,
    uppercase: true,
  }, // Declaração de Aptidão ao Pronaf (documento obrigatório)
});

// Schema principal de usuários
const UserSchema = new mongoose.Schema(
  {
    // Dados básicos de autenticação
    userImage: String,
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true },
    userPhone: { type: String, required: true, unique: true, trim: true },
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
      required: function () {
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
