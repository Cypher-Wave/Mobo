import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import UserService from "../../src/services/UserService";

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

describe("UserService - authenticate", () => {
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
