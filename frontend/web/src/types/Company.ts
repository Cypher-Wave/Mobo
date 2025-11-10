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
export interface ICompany {
  id: string;
  companyCNPJ: string;
  ownerName: string;
  companyName?: string;
  subscriptionPlan: ISubscriptionPlan;
  companyAddress?: ICompanyAddress;
  createdAt: Date;
  updatedAt: Date;
}
