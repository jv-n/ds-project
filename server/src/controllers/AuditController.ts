import { Request, Response } from 'express';
import { ActionRepository } from '../repositories/ActionRepository';
import { sendEmail } from '../services/mailService'; // Adjust the path as needed

const repository = new ActionRepository();
export class AuditController {
    reviewAction = async (req: Request, res: Response) => {
        try {
        const id = Number(req.params.id);
        const { status } = req.body;
    
        if (!['Aprovado', 'Rejeitado'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido. Use "Aprovado" ou "Rejeitado".' });
        }
    
        const action = await repository.update(id, status);
        if (!action) return res.status(404).json({ error: 'Ação não encontrada' });
    
        res.json(action);
        } catch (err) {
        console.error('Erro ao revisar ação:', err);
        res.status(500).json({ error: 'Erro ao revisar ação', details: err instanceof Error ? err.message : err });
        }
    };

    sendEmail = async (req: Request, res: Response) => {
        try {
            const { to, subject } = req.body;
            if (!to || !subject ) {
                return res.status(400).json({ error: 'Campos "to", "subject" e "text" são obrigatórios.' });
            }

            await sendEmail(to, subject);
            res.json({ message: 'E-mail enviado com sucesso.' });
        } catch (err) {
            console.error('Erro ao enviar e-mail:', err);
            res.status(500).json({ error: 'Erro ao enviar e-mail', details: err instanceof Error ? err.message : err });
        }
    }
}