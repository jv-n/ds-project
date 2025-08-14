import { Request, Response } from 'express';
import { SealRepository } from '../repositories/sealRepository';
import { SealService } from '../services/sealService';

const sealRepository = new SealRepository();
const sealService = new SealService();

export class SealController {
  async getCompanySeal(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.id);
      const company = await sealRepository.getEmpresaComAcoesEDoacoes(companyId);

      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      const resultado = sealService.calcularPontuacao(company);
      const existente = await sealRepository.findByEmpresaId(companyId);

      let text = '';
      if (resultado.nivelSelo === 'goldenmedal') {
        text = 'Empresa com alto impacto social e engajamento consistente.';
      }
      if (resultado.nivelSelo === 'silvermedal') {
        text = 'Empresa com bom nível de responsabilidade social.';
      }
      if (resultado.nivelSelo === 'bronzemedal') {
        text = 'Empresa em fase inicial de engajamento social.';
      }

const selo = {
  nivel: resultado.nivelSelo,
  pontuacaoMin: Number(resultado.valorTotalDoado),
  descricao: text
};

if (existente) {
  await sealRepository.update(companyId, selo);
} else {
  await sealRepository.create({ empresaId: companyId, ...selo });
}


      const response = {
        nivel: resultado.nivelSelo,
        ptsodsscomatuacao: resultado.criterios[0].pontuacao.toString(),
        ptsongsatingidas: resultado.criterios[1].pontuacao.toString(),
        ptscolaboradoresengajados: resultado.criterios[2].pontuacao.toString(),
        ptsorcamentodestinado: resultado.criterios[3].pontuacao.toString()
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao calcular selo:', error);
      res.status(500).json({ error: 'Erro interno ao calcular selo' });
    }
  }
}
