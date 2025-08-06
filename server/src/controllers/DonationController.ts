// src/controllers/DonationController.ts
import { Request, Response, NextFunction } from 'express';
import { DonationRepository } from '../repositories/DonationRepository';
import { Donation, UpdateDonation } from '../DTOs';
import { AuthenticatedRequest } from '../middlewares/authMiddleware'; // Certifique-se de que o caminho está correto

const repository = new DonationRepository();

export class DonationController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const donationData = Donation.parse(req.body);
      const documentacao = req.file?.filename ?? 'sem-documento.pdf';
      const donation = await repository.create({
        ...donationData,
        documentacao,
        data: new Date(donationData.data),
      });

      // Envia a resposta diretamente aqui
      res.status(201).json({
        message: 'Doação criada com sucesso',
        data: donation,
      });

      // Não chame next() se a resposta já foi enviada
      // return next(); 
    } catch (err) {
      return next(err);
    }
  };

  getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const loggedEmpresaId = req.empresaId;
      
      if (loggedEmpresaId === undefined) {
        return next({
          status: 401,
          message: 'ID da empresa logada não fornecido. Autenticação necessária.',
        });
      }

      const donations = await repository.findAll(loggedEmpresaId);
      
      // CORREÇÃO: Envia a resposta diretamente aqui
      res.status(200).json(donations);

      // Não chame next() se a resposta já foi enviada
      // return next(); 
    } catch (err) {
      return next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const donation = await repository.findById(id);

      if (!donation) {
        return next({
          status: 404,
          message: 'Doação não encontrada',
        });
      }

      // Envia a resposta diretamente aqui
      res.status(200).json(donation);
      // return next();
    } catch (err) {
      return next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const donationData = UpdateDonation.parse(req.body);
      const documentacao = req.file?.filename;

      const updatedDonation = await repository.update(id, {
        ...donationData,
        documentacao,
        data: donationData.data ? new Date(donationData.data) : undefined,
      });

      // Envia a resposta diretamente aqui
      res.status(200).json({
        message: 'Doação atualizada com sucesso',
        data: updatedDonation,
      });
      // return next();
    } catch (err) {
      return next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await repository.delete(id);
      
      // Envia a resposta diretamente aqui
      res.status(204).send(); // Para DELETE, geralmente não há corpo de resposta
      // return next(); 
    } catch (err) {
      return next(err);
    }
  };
}
