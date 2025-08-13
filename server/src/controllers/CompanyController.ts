// src/controllers/company-controller.ts
import { Request, Response } from 'express';
import { CompanyRepository } from '../repositories/CompanyRepository';

const repository = new CompanyRepository();

export class CompanyController {
  async create(req: Request, res: Response) {
    try {
      const { nome, usuarioId } = req.body;
      const empresa = await repository.create({ nome, usuarioId });
      res.status(201).json(empresa);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao criar empresa', details: err });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const empresas = await repository.findAll();
      res.json(empresas);
    } catch (err) {
      console.error('Erro ao buscar empresas:', err);
      res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const empresa = await repository.findById(id);
      if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
      res.json(empresa);
    } catch (err) {
      console.error('Erro ao buscar empresas:', err);
      res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const empresa = await repository.update(id, data);
      res.json(empresa);
    } catch (err) {
      console.error('Erro ao atualizar empresas:', err);
      res.status(400).json({ error: 'Erro ao atualizar empresa' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await repository.delete(id);
      res.status(204).send();
    } catch (err) {
      console.error('Erro ao deletar empresas:', err);
      res.status(400).json({ error: 'Erro ao deletar empresa' });
    }
  }
}
