import { beforeAll, afterAll, afterEach, describe, it, expect, vi } from "vitest";

import UserService from "../../src/services/UserService";
import User from "../../src/models/User";

import { connectDB, closeDB, clearDB } from "../setup";

// Mock do JWT com Vitest
vi.mock("../../src/utils/jwt", () => ({
  generateToken: vi.fn(() => "fake-token"),
}));

beforeAll(async () => {
  await connectDB();
}, 30000);

afterAll(async () => {
  await closeDB();
});

afterEach(async () => {
  await clearDB();
});

describe("UserService", () => {
  describe("getAll", () => {
    it("Deve retornar todos os usuários", async () => {
      await UserService.create({
        userName: "User1",
        userEmail: "user1@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "111.111.111-11", dap: "AAAAAAA111" },
      });

      await UserService.create({
        userName: "User2",
        userEmail: "user2@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "222.222.222-22", dap: "BBBBBBB222" },
      });

      const users = await UserService.getAll();
      expect(users.length).toBe(2);
    });
  });

  describe("getOne", () => {
    it("Deve retornar o usuário sem o campo 'senha'", async () => {
      const created = await UserService.create({
        userName: "User3",
        userEmail: "user3@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "333.333.333-33", dap: "CCCCCCC333" },
      });

      const user = await UserService.getOne(created.user!.id);

      expect(user).toBeDefined();
      expect((user as any).userPassword).toBeUndefined();
      expect(user?.userEmail).toBe("user3@example.com");
    });
  });
});
