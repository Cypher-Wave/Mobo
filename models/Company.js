// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const CompanySchema = new mongoose.Schema({
    companyName: String,
    companyCNPJ: String,
    companyPhone: String
});

// Criando a Coleção "Companies"
const Company = mongoose.model("Company", CompanySchema);

// Exportando Company
export default Company;