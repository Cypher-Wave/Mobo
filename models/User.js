// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
    userPassword: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

// Garantindo que a senha não seja mostrada ao buscar o usuário
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    // Removendo a senha do objeto antes de retornar
    delete userObject.userPassword;

    return userObject;
};

// Criando a Coleção "Users"
const User = mongoose.model("User", UserSchema);

// Exportando User
export default User;