import { beforeAll, afterAll, afterEach, describe, it, expect, vi } from "vitest";
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

describe("UserService - create", () => {
  it("Deve criar um Agricultor Familiar com sucesso", async () => {
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

  it("Não deve criar um usuário com os campos faltando", async () => {
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
