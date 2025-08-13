import request from "supertest";
import { hash } from "bcryptjs";
import app from "@/app";
import UserRepository from "@/repositories/userRepository";
import TokenRepository from "@/repositories/tokenRepository";

jest.mock("@/repositories/userRepository");
jest.mock("@/repositories/tokenRepository");

describe("Auth Integration", () => {
  beforeEach(() => jest.clearAllMocks());

  it("POST /login sets refresh cookie and returns access token", async () => {
    const hashed = await hash("1234", 10);
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: "user@example.com", senha: hashed });

    const res = await request(app).post("/auth/login").send({ email: "user@example.com", senha: "1234" });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/refresh_token=/);
  });

  it("POST /login/company returns token and sets cookie", async () => {
    const hashed = await hash("pwd", 10);
    (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue({ id: 2, cnpj: "12345", senha: hashed });

    const res = await request(app).post("/auth/login/company").send({ cnpj: "12345", senha: "pwd" });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/refresh_token=/);
  });

  it("POST /auth/refresh with valid token returns new access token", async () => {
    (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue({ id: 3 });
    (UserRepository.findById as jest.Mock).mockResolvedValue({ id: 3, senha: "hash", email: "u@e.com" });

    const res = await request(app)
      .post("/auth/refresh")
      .set("Cookie", "refresh_token=goodRefreshToken");

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.headers["set-cookie"][0]).toMatch(/refresh_token=/);
  });
});
