import { vi, beforeAll, afterAll, afterEach, describe, it, expect } from "vitest";
import bcrypt from "bcrypt";
import UserService from "../../src/services/UserService";

import { connectDB, closeDB, clearDB } from "../setup";

// Mock do JWT usando Vitest
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

describe("UserService - update", () => {
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
