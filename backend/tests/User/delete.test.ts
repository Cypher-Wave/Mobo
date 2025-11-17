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

describe("UserService - delete", () => {
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
