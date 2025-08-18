import { Request, Response } from 'express';
import { DonationRepository } from '../repositories/donationRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import { ActionCompanyRepository } from '../repositories/actionCompanyRepository';
import { sendEmail } from '../services/mailService';
import path from 'path';
import fs from 'fs';

export class DonationController {
  private repository: DonationRepository;
  private companyRepository: CompanyRepository;
  private actionCompanyRepository: ActionCompanyRepository;

  constructor() {
    this.repository = new DonationRepository();
    this.companyRepository = new CompanyRepository();
    this.actionCompanyRepository = new ActionCompanyRepository();
  }

  create = async (req: Request, res: Response) => {
    try {
      // Espera que arquivos foram enviados via multer no campo 'documents'
      const files = req.files as Express.Multer.File[] | undefined;

      const {
        data,
        valor,
        tipo,
        empresaId,
        acaoId,
      } = req.body;

      if (!data || !valor || !tipo || !empresaId || !acaoId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const documentos = files?.map(file => ({
        storedName: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      }));

      const donation = await this.repository.create({
        data: new Date(data),
        valor: Number(valor),
        tipo,
        empresaId: Number(empresaId),
        acaoId: Number(acaoId),
        documentos,
      });

      res.status(201).json(donation);
    } catch (error) {
      console.error('Error creating donation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const donations = await this.repository.findAll();
      res.json(donations);
    } catch (error) {
      console.error('Error fetching all donations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getByStatus = async (req: Request, res: Response) => {
    try {
      const status = req.params.status;
      const donations = await this.repository.findByStatus(status);
      res.json(donations);
    } catch (error) {
      console.error('Error fetching donations by status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getDocumentsByDonationId = async (req: Request, res: Response) => {
    try {
      const donationId = Number(req.params.id);
      if (isNaN(donationId)) {
        return res.status(400).json({ error: 'Invalid donation ID' });
      }

      const documents = await this.repository.findDocumentsByDonationId(donationId);
      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getDocumentById = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.documentId;

    const document = await this.repository.findDocumentById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const filePath = path.resolve(document.path);

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    // Define o cabeçalho para download com o nome original do arquivo
    res.download(filePath, document.storedName);
    } catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

  private async notifyStatusChange(donationId: number, status: 'Aprovado' | 'Reprovado') {
    const donation = await this.repository.findById(donationId);

    if (!donation) {
      throw new Error('Donation not found');
    }

    const actionCompany = await this.actionCompanyRepository.findById(donation.acaoId, donation.empresaId);

    // Buscar email da empresa associada
    const company = await this.companyRepository.findById(donation.empresaId);

    if (!company || !company.usuario?.email) {
      throw new Error('Empresa or email not found');
    }

    const subject = status === 'Aprovado' 
      ? 'Doação Aprovada - Selo de Responsa' 
      : 'Doação Reprovada - Selo de Responsa';

    const data = {
      empresaNome: company.nome,
      status,
      descricao: actionCompany ? actionCompany.descricao : '',
      tipo: donation.tipo,
      valor: donation.valor,
      data: donation.data.toISOString(), // Convert Date to string
      nomeOng: actionCompany ? actionCompany.nomeOng : '',
      emailOng: actionCompany ? actionCompany.emailOng : '',
      telefoneOng: actionCompany ? actionCompany.telefoneOng : '',
    };

    await sendEmail(company.usuario.email, subject, data);
  }

  approveDonation = async (req: Request, res: Response) => {
    try {
      const donationId = Number(req.params.id);
      if (isNaN(donationId)) return res.status(400).json({ error: 'Invalid donation ID' });

      const updatedDonation = await this.repository.updateStatus(donationId, 'Aprovado');

      // Envia notificação por email
      await this.notifyStatusChange(donationId, 'Aprovado');

      res.json(updatedDonation);
    } catch (error) {
      console.error('Error approving donation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  rejectDonation = async (req: Request, res: Response) => {
    try {
      const donationId = Number(req.params.id);
      if (isNaN(donationId)) return res.status(400).json({ error: 'Invalid donation ID' });

      const updatedDonation = await this.repository.updateStatus(donationId, 'Reprovada');

      // Envia notificação por email
      await this.notifyStatusChange(donationId, 'Reprovado');

      res.json(updatedDonation);
    } catch (error) {
      console.error('Error rejecting donation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
