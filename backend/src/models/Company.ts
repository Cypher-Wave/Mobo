import mongoose, { Schema, Document, Model } from "mongoose";

// Interface para o plano de assinatura
interface ISubscriptionPlan {
  maxUsers: number;
  isActive: boolean;
}

// Interface para o endereço da empresa
interface ICompanyAddress {
  state: string;
  city: string;
  zipCode?: string;
}

// Interface principal da empresa
export interface ICompany extends Document {
  companyCNPJ: string;
  ownerName: string;
  companyName: string;
  subscriptionPlan?: ISubscriptionPlan;
  companyAddress?: ICompanyAddress;
  createdAt: Date;
  updatedAt: Date;
}

// Schema para o plano de assinatura
const SubscriptionPlanSchema: Schema<ISubscriptionPlan> = new Schema({
  maxUsers: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true },
});

// Schema para o endereço da empresa
const CompanyAddressSchema: Schema<ICompanyAddress> = new Schema({
  state: { type: String, },
  city: { type: String, },
  zipCode: { type: String },
});

// Schema principal da empresa
const CompanySchema: Schema<ICompany> = new Schema(
  {
    companyCNPJ: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    companyName: { type: String },
    subscriptionPlan: { type: SubscriptionPlanSchema, default: {} },
    companyAddress: { type: CompanyAddressSchema, default: {} },
  },
  { timestamps: true }
);

// Criando o modelo da empresa
const Company: Model<ICompany> = mongoose.model<ICompany>("Company", CompanySchema);

export default Company;