import {
  beforeAll,
  afterAll,
  afterEach,
  describe,
  it,
  expect,
  vi,
} from "vitest";
import bcrypt from "bcrypt";

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
  // Cadastro de Usuário
  describe("create", () => {
    it("Deve cadastrar um Agricultor Familiar com sucesso", async () => {
      const data = {
        userName: "Pedro",
        userEmail: "pedro@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "123.456.789-00", dap: "ABCDEFGHIJ" },
      } as const;

      const result = await UserService.create(data);

      expect(result.success).toBe(true);
      expect(result.user?.userEmail).toBe("pedro@example.com");
      expect(result.user?.farmerDetails?.cpf).toBe(data.farmerDetails.cpf);
      expect(result.user?.farmerDetails?.dap).toBe(data.farmerDetails.dap);

      const userInDb = await User.findOne({ userEmail: "pedro@example.com" });
      expect(userInDb).not.toBeNull();

      const passwordMatch = await bcrypt.compare(
        "123456",
        userInDb!.userPassword
      );
      expect(passwordMatch).toBe(true);
    });

    it("Não deve cadastrar um usuário com os campos faltando", async () => {
      const data = {
        userEmail: "fail@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
      } as any;

      const result = await UserService.create(data);

      expect(result.success).toBe(false);
      expect(result.message).toContain("Campos obrigatórios");
    });

    it("Não deve permitir email duplicado", async () => {
      await UserService.create({
        userName: "Pedro",
        userEmail: "dup@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "123.456.789-00", dap: "ABCDEFGHIJ" },
      });

      const result = await UserService.create({
        userName: "Outro",
        userEmail: "dup@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "987.654.321-00", dap: "KLMNOPQRST" },
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Usuário já cadastrado.");
    });
  });

  // Consulta de Usuários
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

  // Consulta de um Usuário
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

  // Atualização de Usuário
  describe("update", () => {
    it("Deve atualizar o usuário com hash de senha", async () => {
      const created = await UserService.create({
        userName: "User4",
        userEmail: "user4@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "444.444.444-44", dap: "DDDDDDD444" },
      });

      const updated = await UserService.update(created.user!.id, {
        userName: "UpdatedUser",
        userPassword: "newpassword",
      });

      expect(updated?.userName).toBe("UpdatedUser");

      const match = await bcrypt.compare("newpassword", updated!.userPassword);
      expect(match).toBe(true);
    });
  });

  // Exclusão de Usuário
  describe("delete", () => {
    it("deve deletar o usuário", async () => {
      const created = await UserService.create({
        userName: "User5",
        userEmail: "user5@example.com",
        userPassword: "123456",
        userRole: "family_farmer",
        farmerDetails: { cpf: "555.555.555-55", dap: "EEEEEEE555" },
      });

      await UserService.delete(created.user!.id);

      const userInDb = await User.findById(created.user!.id);

      expect(userInDb).toBeNull();
    });
  });

  // Autenticação de Usuário
  describe("authenticate", () => {
    it("Deve autenticar com as credenciais corretas", async () => {
      await UserService.create({
        userName: "AuthUser",
        userEmail: "auth@example.com",
        userPassword: "password123",
        userRole: "family_farmer",
        farmerDetails: { cpf: "666.666.666-66", dap: "FFFFFF6668" },
      });

      const result = await UserService.authenticate({
        userEmail: "auth@example.com",
        userPassword: "password123",
      });

      expect(result.success).toBe(true);
      expect(result.token).toBe("fake-token");
      expect(result.user?.userRole).toBe("family_farmer");
    });

    it("Deve falhar a autenticação por causa da senha incorreta", async () => {
      await UserService.create({
        userName: "AuthUser2",
        userEmail: "auth2@example.com",
        userPassword: "password123",
        userRole: "family_farmer",
        farmerDetails: { cpf: "777.777.777-77", dap: "GGGGGG77789" },
      });

      const result = await UserService.authenticate({
        userEmail: "auth2@example.com",
        userPassword: "wrongpass",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Senha incorreta.");
    });
  });
});
