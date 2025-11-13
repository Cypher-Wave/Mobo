import { Types } from "mongoose";
import { IUserPayload } from "./jwt";

interface OwnedDocument {
  user?: Types.ObjectId | string;
  company?: Types.ObjectId | string;
}

// Padroniza dados recebidos para serem sempre ObjectId ou string
export function ownedFields(doc: { user?: any; company?: any }) {
  return {
    user: doc.user as Types.ObjectId | string,
    company: doc.company as Types.ObjectId | string,
  };
}

// Adiciona user ou company a um novo documento baseado na role
export function assignOwnership<
  T extends { user?: unknown; company?: unknown }
>(userSession: IUserPayload, doc: T): void {
  if (userSession.userRole === "family_farmer") {
    doc.user = userSession.id as any;
  } else {
    doc.company = userSession.company as any;
  }
}

// Verifica se um usuário/empresa está tentando acessar um dado que não lhe pertence
export function checkOwnership<T extends OwnedDocument>(
  userSession: IUserPayload,
  doc: T
): void {
  if (
    userSession.userRole === "family_farmer" &&
    (!doc.user || !new Types.ObjectId(doc.user).equals(userSession.id))
  ) {
    throw new Error("Acesso negado: este conteúdo não pertence a você.");
  }

  if (
    userSession.userRole !== "family_farmer" &&
    (!doc.company ||
      !new Types.ObjectId(doc.company).equals(userSession.company))
  ) {
    throw new Error("Acesso negado: este conteúdo não pertence à sua empresa.");
  }
}
