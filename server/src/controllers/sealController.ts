import { NextFunction, Request, Response } from 'express';
import { SealRepository } from '../repositories/sealRepository';
import { SealService } from '../services/sealService';

const sealRepository = new SealRepository();
const sealService = new SealService();

export class SealController {
  async getCompanySeal(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = Number(req.params.id);
      
      const anoAtual = new Date().getFullYear();

      const company = await sealRepository.getEmpresaComAcoesEDoacoes(companyId, anoAtual);

      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      const resultado = sealService.calcularPontuacao(company);
      
      const seloExistente = await sealRepository.findByEmpresaIdAndAno(companyId, anoAtual);

      let text = '';
      if (resultado.nivelSelo === 'goldenmedal') {
        text = 'Empresa com alto impacto social e engajamento consistente.';
      } else if (resultado.nivelSelo === 'silvermedal') {
        text = 'Empresa com bom nível de responsabilidade social.';
      } else {
        text = 'Empresa em fase inicial de engajamento social.';
      }

      if (seloExistente) {
        const dadosParaAtualizar = {
          nivel: resultado.nivelSelo,
          pontuacaoMin: resultado.valorTotalDoado,
          descricao: text,
          ano: anoAtual
        };
        await sealRepository.update(seloExistente.id, dadosParaAtualizar);
      } else {
        const dadosParaCriar = {
          empresaId: companyId,
          nivel: resultado.nivelSelo,
          pontuacaoMin: resultado.valorTotalDoado,
          descricao: text,
          ano: anoAtual
        };
        await sealRepository.create(dadosParaCriar);
      }

      const response = {
        nivel: resultado.nivelSelo,
        ptsodsscomatuacao: resultado.criterios[0].pontuacao,
        ptsongsatingidas: resultado.criterios[1].pontuacao,
        ptscolaboradoresengajados: resultado.criterios[2].pontuacao,
        ptsorcamentodestinado: resultado.criterios[3].pontuacao
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao calcular selo:', error);
      res.status(500).json({ error: 'Erro interno ao calcular selo' });
    }
  }

  async getCompanySealHistory(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.id);

      const selos = await sealRepository.findAllByEmpresaId(companyId);

      if (!selos || selos.length === 0) {
        return res.status(404).json({ error: 'Nenhum selo encontrado para esta empresa.' });
      }

      res.json(selos);
    } catch (error) {
      console.error('Erro ao buscar histórico de selos:', error);
      res.status(500).json({ error: 'Erro interno ao buscar histórico de selos' });
    }
  }

}