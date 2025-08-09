import { Request, Response } from 'express';
import { ActionRepository } from '../repositories/ActionRepository';

export class ActionController {
  private repository = new ActionRepository();

  create = async (req: Request, res: Response) => {
    try {
      const { data, valor, tipoAjuda, empresaId, ongId, prefeituraId } = req.body;
      
      // Validate required fields
      if (!data || !valor || !tipoAjuda || !empresaId || !ongId) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios: data, valor, tipoAjuda, empresaId, ongId' 
        });
      }

      const documentacao = req.file?.filename ?? 'sem-documento.pdf';

      const action = await this.repository.create({
        data: new Date(data),
        valor: parseFloat(valor),
        tipoAjuda,
        documentacao,
        empresaId: parseInt(empresaId),
        ongId: parseInt(ongId),
        prefeituraId: prefeituraId ? parseInt(prefeituraId) : undefined,
      });

      res.status(201).json(action);
    } catch (err) {
      console.error('Error creating action:', err);
      res.status(400).json({ error: 'Erro ao criar ação', details: err instanceof Error ? err.message : err });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const actions = await this.repository.findAll();
      res.json(actions);
    } catch (err) {
      console.error('Erro ao buscar ações:', err);
      res.status(500).json({ error: 'Erro ao buscar ações' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      
      const action = await this.repository.findById(id);
      if (!action) return res.status(404).json({ error: 'Ação não encontrada' });
      res.json(action);
    } catch (err) {
      console.error('Erro ao buscar ação:', err);
      res.status(500).json({ error: 'Erro ao buscar ação', details: err instanceof Error ? err.message : err });
    }
  };

  getByCompany = async (req: Request, res: Response) => {
    try {
      const empresaId = Number(req.params.empresaId);
      
      if (isNaN(empresaId)) {
        return res.status(400).json({ error: 'ID da empresa inválido' });
      }
      
      const actions = await this.repository.findByCompanyId(empresaId);
      res.json(actions);
    } catch (err) {
      console.error('Erro ao buscar ações da empresa:', err);
      res.status(500).json({ error: 'Erro ao buscar ações da empresa', details: err instanceof Error ? err.message : err });
    }
  };

  getByOng = async (req: Request, res: Response) => {
    try {
      const ongId = Number(req.params.ongId);
      
      if (isNaN(ongId)) {
        return res.status(400).json({ error: 'ID da ONG inválido' });
      }
      
      const actions = await this.repository.findByOngId(ongId);
      res.json(actions);
    } catch (err) {
      console.error('Erro ao buscar ações da ONG:', err);
      res.status(500).json({ error: 'Erro ao buscar ações da ONG', details: err instanceof Error ? err.message : err });
    }
  };

  getByPrefeitura = async (req: Request, res: Response) => {
    try {
      const prefeituraId = Number(req.params.prefeituraId);
      
      if (isNaN(prefeituraId)) {
        return res.status(400).json({ error: 'ID da prefeitura inválido' });
      }
      
      const actions = await this.repository.findByPrefeituraId(prefeituraId);
      res.json(actions);
    } catch (err) {
      console.error('Erro ao buscar ações da prefeitura:', err);
      res.status(500).json({ error: 'Erro ao buscar ações da prefeitura', details: err instanceof Error ? err.message : err });
    }
  };

  getStats = async (_req: Request, res: Response) => {
    try {
      const stats = await this.repository.getActionStats();
      res.json(stats);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
      res.status(500).json({ error: 'Erro ao buscar estatísticas', details: err instanceof Error ? err.message : err });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const documentacao = req.file?.filename;

      const data = {
        ...req.body,
        data: req.body.data ? new Date(req.body.data) : undefined,
        valor: req.body.valor ? parseFloat(req.body.valor) : undefined,
        empresaId: req.body.empresaId ? parseInt(req.body.empresaId) : undefined,
        ongId: req.body.ongId ? parseInt(req.body.ongId) : undefined,
        prefeituraId: req.body.prefeituraId ? parseInt(req.body.prefeituraId) : undefined,
        documentacao,
      };

      const action = await this.repository.update(id, data);
      res.json(action);
    } catch (err) {
      console.error('Error updating action:', err);
      res.status(400).json({ error: 'Erro ao atualizar ação', details: err });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.repository.delete(id);
      res.status(204).send();
    } catch (err) {
      console.error('Erro ao deletar ação:', err);
      res.status(400).json({ error: 'Erro ao deletar ação', details: err instanceof Error ? err.message : err });
    }
  };
}