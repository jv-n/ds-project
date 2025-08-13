// LoginController.test.ts
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

describe("LoginController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: { email: "user@example.com", senha: "1234" }, cookies: {}, headers: {} };
    res = { locals: {} } as any;
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should error when user not found", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await LoginController.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid credentials." });
    });

    it("should error when password incorrect", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);

      await LoginController.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({ status: 400, message: "Invalid credentials." });
    });

    it("should login successfully", async () => {
      const user = { id: 1, senha: "hash", email: "user@example.com" };
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(user);
      (compare as jest.Mock).mockResolvedValue(true);
      (TokenRepository.generateAccessToken as jest.Mock).mockReturnValue("access-token");
      (TokenRepository.generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");

      await LoginController.login(req as Request, res as Response, next);

      expect(CookieRepository.setCookie).toHaveBeenCalledWith(expect.anything(), "refresh_token", "refresh-token");
      expect(res.locals).toMatchObject({
        status: 200,
        message: "User logged",
        data: { loggedUser: { id: 1, email: "user@example.com" }, accessToken: "access-token" },
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe("loginCompany", () => {
    beforeEach(() => {
      req.body = { cnpj: "123", senha: "1234" };
    });

    it("should error when company user not found", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue(null);

      await LoginController.loginCompany(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({ status: 401, message: "Invalid credentials." });
    });

    it("should error when password incorrect for company", async () => {
      (UserRepository.findUserByCnpj as jest.Mock).mockResolvedValue({ senha: "hash" });
      (compare as jest.Mock).mockResolvedValue(false);

      await LoginController.loginCompany(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({ status: 401, message: "Invalid credentials." });
    });
  });

  describe("refresh", () => {
    it("should error when no refresh token cookie", async () => {
      await LoginController.refresh(req as Request, res as Response, next);

      expect(req.headers.authorization).toBeUndefined();
      expect(next).toHaveBeenCalledWith({ status: 401, message: "Invalid token" });
    });

    it("should error when token invalid", async () => {
      req.cookies = { refresh_token: "bad" };
      (TokenRepository.verifyRefreshToken as jest.Mock).mockReturnValue(null);

      await LoginController.refresh(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({ status: 401, message: "Invalid token" });
    });
  });

  describe("logout", () => {
    it("should clear cookie and authorization", async () => {
      await LoginController.logout(req as Request, res as Response, next);

      expect(CookieRepository.clearCookies).toHaveBeenCalledWith(expect.anything(), "refresh_token");
      expect(req.headers.authorization).toBeUndefined();
      expect(res.locals).toMatchObject({ status: 200, message: "User logged out" });
      expect(next).toHaveBeenCalled();
    });
  });
});
