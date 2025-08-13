import { Request, Response, NextFunction } from "express";
import { compare } from "bcryptjs";
import LoginController from "@/controllers/LoginController";
import UserRepository from "@/repositories/userRepository";
import TokenRepository from "@/repositories/tokenRepository";
import CookieRepository from "@/repositories/cookieRepository";

jest.mock("@/repositories/userRepository");
jest.mock("@/repositories/tokenRepository");
jest.mock("@/repositories/cookieRepository");
jest.mock("bcryptjs", () => ({ compare: jest.fn() }));

describe("LoginController - Unit Tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {}, cookies: {}, headers: {} };
    res = { locals: {} } as Partial<Response>;
    next = jest.fn();
    jest.clearAllMocks();
  });


  describe("login", () => {
    it("deve retornar erro se Login.parse lançar exceção", async () => {
      jest.spyOn(require("@/DTOs"), "Login").mockImplementation(() => {
        throw new Error("Invalid body");
      });
      await LoginController.login(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it("deve retornar erro se usuário não encontrado", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (compare as jest.Mock).mockResolvedValue(true);
      req.body = { email: "test@test.com", senha: "123456" };

      await LoginController.login(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
    });

    it("deve retornar erro se senha incorreta", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);
      req.body = { email: "test@test.com", senha: "wrong" };

      await LoginController.login(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
    });

    it("deve fazer login com sucesso", async () => {
      const userMock = { id: 1, senha: "hash", name: "Test" };
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(userMock);
      (compare as jest.Mock).mockResolvedValue(true);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      req.body = { email: "test@test.com", senha: "123456" };

      await LoginController.login(req as Request, res as Response, next as NextFunction);

      expect(TokenRepository.generateAccessToken).toHaveBeenCalled();
      expect(CookieRepository.setCookie).toHaveBeenCalledWith(res, "refresh_token", "refresh-token");
      expect(res.locals.status).toBe(200);
      expect(res.locals.data.accessToken).toBe("access-token");
      expect(next).toHaveBeenCalled();
    });
  });


  describe("loginCompany", () => {
    it("deve retornar erro se LoginCnpj.parse lançar exceção", async () => {
      jest.spyOn(require("@/DTOs"), "LoginCnpj").mockImplementation(() => {
        throw new Error("Invalid body");
      });
      await LoginController.loginCompany(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it("deve retornar erro se empresa não encontrada", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue(null);
      req.body = { cnpj: "12345678000190", senha: "123456" };
      await LoginController.loginCompany(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("deve retornar erro se senha incorreta", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue({ id: 1, senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);
      req.body = { cnpj: "12345678000190", senha: "wrong" };
      await LoginController.loginCompany(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("deve fazer login de empresa com sucesso", async () => {
      const userMock = { id: 1, senha: "hash", name: "Empresa" };
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue(userMock);
      (compare as jest.Mock).mockResolvedValue(true);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      req.body = { cnpj: "12345678000190", senha: "123456" };

      await LoginController.loginCompany(req as Request, res as Response, next as NextFunction);
      expect(res.locals.status).toBe(200);
      expect(res.locals.data.accessToken).toBe("access-token");
    });
  });


  describe("refresh", () => {
    it("deve retornar erro se não houver refresh_token", async () => {
      req.cookies = {};
      await LoginController.refresh(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("deve retornar erro se refresh_token inválido", async () => {
      req.cookies = { refresh_token: "invalid" };
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue(null);
      await LoginController.refresh(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));
    });

    it("deve retornar erro se usuário não encontrado", async () => {
      req.cookies = { refresh_token: "valid" };
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue({ id: 1 });
      (UserRepository.findById as jest.Mock).mockResolvedValue(null);
      await LoginController.refresh(req as Request, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
    });

    it("deve fazer refresh com sucesso", async () => {
      req.cookies = { refresh_token: "valid" };
      const userMock = { id: 1, senha: "hash", name: "User" };
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue({ id: 1 });
      (UserRepository.findById as jest.Mock).mockResolvedValue(userMock);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("new-refresh-token");

      await LoginController.refresh(req as Request, res as Response, next as NextFunction);

      expect(CookieRepository.setCookie).toHaveBeenCalledWith(res, "refresh_token", "new-refresh-token");
      expect(res.locals.status).toBe(200);
    });
  });


  describe("logout", () => {
    it("deve fazer logout com sucesso", async () => {
      await LoginController.logout(req as Request, res as Response, next as NextFunction);
      expect(CookieRepository.clearCookies).toHaveBeenCalledWith(res, "refresh_token");
      expect(res.locals.status).toBe(200);
      expect(next).toHaveBeenCalled();
    });
  });
});
