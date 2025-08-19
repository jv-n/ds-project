import { Request, Response } from 'express';
import { ActionCompanyRepository } from '../repositories/actionCompanyRepository';
import axios from 'axios';

export class ActionCompanyController {
  private repository: ActionCompanyRepository;

  constructor() {
    this.repository = new ActionCompanyRepository();
  }

  getAllActions = async (req: Request, res: Response) => {
    try {
      const { ods } = req.body;
      let odsList: number[] = [];

      if (Array.isArray(ods) && ods.length > 0) {
        // Caso o usuário envie um array de ODS no body
        odsList = ods.map(Number);
      } else {
        odsList = [1]; // fallback para ODS ID 1
      }

      // Fazer as requisições para cada ODS
      const requests = odsList.map(async (odsId) => {
        const url = `https://bora-impactar-prd.setd.rdmapps.com.br/api/sustainable_development_goals/${odsId}/actions.json`;
        const response = await axios.get(url);
        return response.data; // assumindo que vem array de ações
      });

      // Esperar todas as requisições finalizarem
      const results = await Promise.all(requests);

      // Flatten para um único array
      const allActions = results.flat();

      res.json(allActions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar ações das ODS.' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const {
        nome,
        descricao,
        nomeOng,
        emailOng,
        telefoneOng,
        acaoId,
        empresaId,
        odsAcao,
      } = req.body;

      if (
        !nome ||
        !descricao ||
        !nomeOng ||
        !emailOng ||
        !telefoneOng ||
        !acaoId ||
        !empresaId ||
        !odsAcao
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const actionCompany = await this.repository.create({
        nome,
        descricao,
        nomeOng,
        emailOng,
        telefoneOng,
        acaoId: Number(acaoId),
        empresaId: Number(empresaId),
        odsAcao, // opcional, se não for enviado, será um array vazio
      });

      res.status(201).json(actionCompany);
    } catch (error) {
      console.error('Error creating ActionCompany:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getByCompanyId = async (req: Request, res: Response) => {
    try {
      const companyId = Number(req.params.companyId);

      const actions = await this.repository.getByCompanyId(companyId);
      res.json(actions);
    } catch (error) {
      console.error('Error fetching actions by company ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const companyId = Number(req.params.companyId);
      const actionId = Number(req.params.actionId);

      if (isNaN(companyId) || isNaN(actionId)) {
        return res
          .status(400)
          .json({ error: 'Invalid company ID or action ID' });
      }

      const actionCompany = await this.repository.findById(companyId, actionId);
      if (!actionCompany) {
        return res.status(404).json({ error: 'Action not found' });
      }

      res.json(actionCompany);
    } catch (error) {
      console.error('Error fetching action by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getDonationsById = async (req: Request, res: Response) => {
    try {
      const companyId = Number(req.params.companyId);
      const actionId = Number(req.params.actionId);

      if (isNaN(companyId) || isNaN(actionId)) {
        return res
          .status(400)
          .json({ error: 'Invalid company ID or action ID' });
      }

      const donations = await this.repository.getDonationsById(
        companyId,
        actionId,
      );
      res.json(donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
