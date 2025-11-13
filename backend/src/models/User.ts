import mongoose, { Schema, Document, Model } from "mongoose";
import { ICompany } from "./Company";

// Interface para detalhes de agricultores familiares
interface IFarmerDetails {
  cpf: string;
  dap: string;
}

// Interface principal do usuário
export interface IUser extends Document {
  userImage?: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone?: string;
  userRole: "family_farmer" | "company_admin" | "company_worker";
  company?: ICompany["_id"];
  farmerDetails?: IFarmerDetails;
  createdAt: Date;
  updatedAt: Date;
  toJSON(): Partial<IUser>;
}

// Schema para detalhes de agricultores familiares
const FarmerDetailsSchema: Schema<IFarmerDetails> = new Schema({
  cpf: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v), // Formato 000.000.000-00
      message: "CPF inválido!",
    },
  },
  dap: {
    type: String,
    required: true,
    minlength: 10,
    uppercase: true,
  },
});

// Schema principal do usuário
const UserSchema: Schema<IUser> = new Schema(
  {
    userImage: { type: String },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true },
    userPhone: { type: String, trim: true},
    userRole: {
      type: String,
      enum: ["family_farmer", "company_admin", "company_worker"],
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: function (this: IUser) {
        return this.userRole !== "family_farmer";
      },
    },
    farmerDetails: {
      type: FarmerDetailsSchema,
      required: function (this: IUser) {
        return this.userRole === "family_farmer";
      },
    },
  },
  { timestamps: true }
);

// Método para remover a senha ao converter para JSON
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.userPassword;
  return userObject;
};

// Criando o modelo do usuário
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;