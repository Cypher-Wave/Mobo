import mongoose from "mongoose";

// Schema para planos de assinaturas da empresa
const SubscriptionPlanSchema = new mongoose.Schema({
  maxUsers: { type: Number, default: 5 }, // Número máximo de usuários
  isActive: { type: Boolean, default: true },
});

// Schema para endereços de empresas
const CompanyAddressSchema = new mongoose.Schema({
  state: String,
  city: String,
  zipCode: String,
});

// Schema principal de empresas
const CompanySchema = new mongoose.Schema(
  {
    // Dados jurídicos
    companyCNPJ: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    companyName: String,
    // Configurações de equipe
    subscriptionPlan: SubscriptionPlanSchema,
    // Endereço
    companyAddress: CompanyAddressSchema,
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection companies
const Company = mongoose.model("Company", CompanySchema);

export default Company;
