import request from "supertest";
import app from "@/app"; 
import UserRepository from "@/repositories/userRepository";
import TokenRepository from "@/repositories/tokenRepository";
import CookieRepository from "@/repositories/cookieRepository";
import { compare } from "bcryptjs";

jest.mock("@/repositories/userRepository");
jest.mock("@/repositories/tokenRepository");
jest.mock("@/repositories/cookieRepository");
jest.mock("bcryptjs", () => ({ compare: jest.fn() }));

describe("LoginController - Integration Tests", () => {
  const baseUrl = "/auth"; 

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/login", () => {
    it("deve retornar 400 se credenciais inválidas", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post(`${baseUrl}/login`)
        .send({ email: "invalid@test.com", senha: "123456" });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/credenciais/i);
    });

    it("deve retornar 400 se senha incorreta", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);

      const res = await request(app)
        .post(`${baseUrl}/login`)
        .send({ email: "test@test.com", senha: "wrong" });

      expect(res.status).toBe(400);
    });

    it("deve fazer login com sucesso", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(true);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      const res = await request(app)
        .post(`${baseUrl}/login`)
        .send({ email: "test@test.com", senha: "123456" });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe("access-token");
    });
  });

  describe("POST /auth/login-company", () => {
    it("deve retornar 401 se CNPJ não encontrado", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post(`${baseUrl}/login-company`)
        .send({ cnpj: "12345678000190", senha: "123456" });

      expect(res.status).toBe(401);
    });

    it("deve retornar 401 se senha incorreta", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);

      const res = await request(app)
        .post(`${baseUrl}/login-company`)
        .send({ cnpj: "12345678000190", senha: "wrong" });

      expect(res.status).toBe(401);
    });

    it("deve fazer login de empresa com sucesso", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(true);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      const res = await request(app)
        .post(`${baseUrl}/login-company`)
        .send({ cnpj: "12345678000190", senha: "123456" });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe("access-token");
    });
  });

  describe("POST /auth/refresh", () => {
    it("deve retornar 401 se não houver refresh_token", async () => {
      const res = await request(app).post(`${baseUrl}/refresh`);
      expect(res.status).toBe(401);
    });

    it("deve retornar 401 se token inválido", async () => {
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue(null);

      const res = await request(app)
        .post(`${baseUrl}/refresh`)
        .set("Cookie", "refresh_token=invalid");

      expect(res.status).toBe(401);
    });

    it("deve fazer refresh com sucesso", async () => {
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue({ id: 1 });
      (UserRepository.findById as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("new-refresh-token");

      const res = await request(app)
        .post(`${baseUrl}/refresh`)
        .set("Cookie", "refresh_token=valid");

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe("access-token");
    });
  });

  describe("POST /auth/logout", () => {
    it("deve fazer logout com sucesso", async () => {
      const res = await request(app).post(`${baseUrl}/logout`);
      expect(res.status).toBe(200);
    });
  });
});
