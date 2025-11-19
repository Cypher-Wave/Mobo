import {
  beforeAll,
  afterAll,
  afterEach,
  describe,
  it,
  expect,
  vi,
} from "vitest";

import Company from "../../src/models/Company";
import CompanyService from "../../src/services/CompanyService";

import { connectDB, closeDB, clearDB } from "../setup";

beforeAll(async () => {
  await connectDB();
}, 30000);

afterAll(async () => {
  await closeDB();
});

afterEach(async () => {
  await clearDB();
});

describe("CompanyService", () => {
  // Cadastro de Empresa
  describe("create", () => {
    it("Deve cadastrar uma Empresa com sucesso", async () => {
      const data = {
        companyCNPJ: "11.222.333/4444-55",
        ownerName: "OwnerCompany",
        companyName: "CompanyName",
      } as const;

      const result = await CompanyService.create(data);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Empresa criada com sucesso.");

      const companyInDb = await Company.findOne({ companyCNPJ: "11.222.333/4444-55" });
      expect(companyInDb).not.toBeNull();
    });

    it("Não deve cadastrar uma empresa com os campos faltando", async () => {
      const data = {
        ownerName: "OwnerCompany",
        companyName: "CompanyName",
      } as any;

      const result = await CompanyService.create(data);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Campos obrigatórios não preenchidos.");
    });
  });

  // Consulta de Empresas
  describe("getAll", () => {
    it("Deve retornar todos as empresas", async () => {
      await CompanyService.create({
        companyCNPJ: "33.444.555/6666-77",
        ownerName: "Owner1",
        companyName: "Company1",
        subscriptionPlan: {
          maxUsers: 5,
          isActive: true,
        },
        companyAddress: {
          state: "São Paulo",
          city: "Registro",
          zipCode: "11900-000",
        },
      });

      await CompanyService.create({
        companyCNPJ: "44.555.666/7777-88",
        ownerName: "Owner2",
        companyName: "Company2",
        subscriptionPlan: {
          maxUsers: 5,
          isActive: true,
        },
        companyAddress: {
          state: "São Paulo",
          city: "Eldorado",
          zipCode: "11900-000",
        },
      });

      const companies = await CompanyService.getAll();
      expect(companies.length).toBe(2);
    });
  });

  // Consulta de uma Empresa
  describe("getOne", () => {
    it("Deve retornar a empresa", async () => {
      const created = await CompanyService.create({
        companyCNPJ: "22.333.444/5555-66",
        ownerName: "Owner3",
        companyName: "Company3",
        companyAddress: {
          state: "São Paulo",
          city: "Eldorado",
          zipCode: "11900-000",
        },
      });

      const company = await CompanyService.getOne(created.company!.id);

      expect(company).toBeDefined();
      expect(company!.companyCNPJ).toBe("22.333.444/5555-66");
    });
  });

  // Atualização de Empresa
  describe("update", () => {
    it("Deve atualizar a empresa", async () => {
      const created = await CompanyService.create({
        companyCNPJ: "22.333.444/5555-66",
        ownerName: "Owner4",
        companyName: "Company4",
        companyAddress: {
          state: "São Paulo",
          city: "Eldorado",
          zipCode: "11900-000",
        },
      });

      const updated = await CompanyService.update(created.company!.id, {
        ownerName: "UpdatedOwner",
        companyName: "UpdatedCompany",
      });

      expect(updated?.ownerName).toBe("UpdatedOwner");
      expect(updated?.companyName).toBe("UpdatedCompany");
    });
  });

  // Exclusão de Empresa
  describe("delete", () => {
    it("deve deletar a empresa", async () => {
      const created = await CompanyService.create({
        companyCNPJ: "55.444.333/7777-66",
        ownerName: "Owner5",
        companyName: "Company5",
      });

      await CompanyService.delete(created.company!.id);

      const companyInDb = await Company.findById(created.company!.id);

      expect(companyInDb).toBeNull();
    });
  });
});
