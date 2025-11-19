import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "vitest";
import HarvestService from "../../src/services/HarvestService";
import Harvest from "../../src/models/Harvest";
import User from "../../src/models/User";
import Planting from "../../src/models/Planting";
import Company from "../../src/models/Company";

import { connectDB, closeDB, clearDB } from "../setup";

let fakeUser: any;
let fakeCompanyUser: any;
let fakePlanting: any;
let fakeHarvest: any;
let fakeCompany: any;

vi.mock("../../src/utils/jwt", () => ({
  generateToken: vi.fn(() => "fake-token"),
}));

beforeAll(async () => {
  await connectDB();

  // Cria agricultor
  fakeUser = await User.create({
    userName: "Farmer",
    userEmail: "farmer@example.com",
    userPassword: "123456",
    userRole: "family_farmer",
    farmerDetails: { cpf: "111.111.111-11", dap: "AAAA111111" },
  });

  // Cria Empresa
  fakeCompany = await Company.create({
    companyCNPJ: "11.222.333/4444-55",
    ownerName: "OwnerCompany",
    companyName: "CompanyName",
  });

  // Cria agricultor
  fakeCompanyUser = await User.create({
    userName: "Admin",
    userEmail: "admin@example.com",
    userPassword: "123456",
    userRole: "company_admin",
    company: fakeCompany._id,
  });

  // Cria plantação
  fakePlanting = await Planting.create({
    plantingName: "Lychee Field",
    plantingArea: 500,
    startDate: new Date(),
    user: fakeUser._id,
  });

  // Colheita
  fakeHarvest = {
    harvestedQuantity: 50,
    quality: 90,
    harvestDate: new Date(),
    harvestStart: new Date(),
    harvestEnd: new Date(),
    harvestDuration: 120,
    planting: fakePlanting._id,
    user: fakeUser._id,
  };
}, 30000);

afterAll(async () => {
  await closeDB();
});

afterEach(async () => {
  await clearDB();
});

describe("HarvestService", () => {
  // Cadastro de Colheita
  describe("create", () => {
    it("Deve criar uma colheita com sucesso", async () => {
      const session = {
        id: fakeUser._id.toString(),
        userRole: fakeUser.userRole,
      };

      const data = {
        harvestedQuantity: 50,
        quality: 90,
        harvestDate: new Date(),
        harvestStart: new Date("2025-01-01T08:00:00"),
        harvestEnd: new Date("2025-01-01T10:00:00"),
        harvestDuration: 60,
        planting: fakePlanting._id.toString(),
      };

      const result = await HarvestService.create(session as any, data);

      expect(result).toBeDefined();
      expect(result.harvestedQuantity).toBe(50);
      expect(result.quality).toBe(90);
      expect(result.planting).toStrictEqual(fakePlanting._id);
      expect(result.user).toStrictEqual(fakeUser._id);

      // Confere se salvou
      const saved = await Harvest.findById(result._id);
      expect(saved).not.toBeNull();
    });

    it("Não deve criar se harvestedQuantity <= 0", async () => {
      const session = {
        id: fakeUser._id.toString(),
        userRole: fakeUser.userRole,
      };

      const badData = {
        harvestedQuantity: 0,
        quality: 80,
        harvestDate: new Date(),
        harvestStart: new Date("2025-01-01T08:00:00"),
        harvestEnd: new Date("2025-01-01T09:00:00"),
        harvestDuration: 60,
        planting: fakePlanting._id.toString(),
      };

      await expect(
        HarvestService.create(session as any, badData)
      ).rejects.toThrow("A quantidade colhida deve ser maior que zero.");
    });

    it("Não deve criar se harvestEnd < harvestStart", async () => {
      const session = {
        id: fakeUser._id.toString(),
        userRole: fakeUser.userRole,
      };

      const badData = {
        harvestedQuantity: 10,
        quality: 80,
        harvestDate: new Date(),
        harvestStart: new Date("2025-01-01T10:00:00"),
        harvestEnd: new Date("2025-01-01T08:00:00"),
        harvestDuration: 120,
        planting: fakePlanting._id.toString(),
      };

      await expect(
        HarvestService.create(session as any, badData)
      ).rejects.toThrow(
        "A data final da colheita não pode ser anterior ao início."
      );
    });
  });

  // Consulta de Colheitas
  describe("getAll", () => {
    it("Deve buscar colheitas do usuário (family_farmer)", async () => {
      const session = {
        id: fakeUser._id.toString(),
        userRole: fakeUser.userRole,
      };

      await HarvestService.create(session as any, fakeHarvest);
      await HarvestService.create(session as any, {
        harvestedQuantity: 100,
        quality: 9,
        harvestDate: new Date(),
        harvestStart: new Date(),
        harvestEnd: new Date(),
        harvestDuration: 120,
        planting: fakePlanting._id,
        user: fakeUser._id,
      });

      const harvests = await HarvestService.getAll(session);
      expect(harvests.length).toBe(2);
    });

    it("Deve buscar colheitas da empresa", async () => {
      const session = {
        id: fakeCompanyUser._id.toString(),
        userRole: fakeCompanyUser.userRole,
        company: fakeCompanyUser.company,
      };

      await HarvestService.create(session as any, {
        harvestedQuantity: 200,
        quality: 9,
        harvestDate: new Date(),
        harvestStart: new Date(),
        harvestEnd: new Date(),
        harvestDuration: 120,
        planting: fakePlanting._id,
        user: fakeUser._id,
        company: fakeCompany._id,
      });
      await HarvestService.create(session as any, {
        harvestedQuantity: 50,
        quality: 9.5,
        harvestDate: new Date(),
        harvestStart: new Date(),
        harvestEnd: new Date(),
        harvestDuration: 60,
        planting: fakePlanting._id,
        user: fakeUser._id,
        company: fakeCompany._id,
      });

      const harvests = await HarvestService.getAll(session);
      expect(harvests.length).toBe(2);
    });
  });
});
