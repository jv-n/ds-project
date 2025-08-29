import { AcaoEmpresa, Doacao } from '@prisma/client';
import { EmpresaComAcoesEDoacoes } from '../repositories/sealRepository';

type AcaoComDoacoes = AcaoEmpresa & { doacoes: Doacao[] };

export class SealService {
  private pontuacaoPorODS(numODS: number): number {
    if (numODS > 9) return 33;
    if (numODS >= 7) return 20;
    if (numODS >= 5) return 15;
    if (numODS >= 3) return 10;
    if (numODS >= 1) return 5;
    return 0;
  }

  private pontuacaoPorONGs(acoes: AcaoComDoacoes[]): number {
    const ongs = new Set(
      acoes
        .filter(acao => acao.doacoes.length > 0) 
        .map(acao => acao.nomeOng)
    );
    const numONGs = ongs.size;
    if (numONGs >= 7) return 30;
    if (numONGs >= 5) return 25;
    if (numONGs >= 3) return 14;
    if (numONGs >= 1) return 7;
    return 0;
  }
  
  private pontuacaoPorEngajamento(acoes: AcaoComDoacoes[], numColaboradores: number): number {
    const voluntarios = acoes.flatMap(acao => acao.doacoes.filter(d => d.tipo === 'Serviço')).length;
    const porcentagem = numColaboradores > 0 ? (voluntarios / numColaboradores) * 100 : 0;

    if (porcentagem >= 30) return 21;
    if (porcentagem >= 21) return 12;
    if (porcentagem >= 11) return 9;
    if (porcentagem >= 6) return 6;
    if (porcentagem >= 1) return 4;
    return 0;
  }

  private pontuacaoPorValorDoado(amount: number): number {
    if (amount >= 50000) return 16;
    if (amount >= 25000) return 8;
    if (amount >= 10000) return 5;
    if (amount >= 5000) return 1;
    return 0;
  }

  private totalDoadoEmDinheiro(acoes: AcaoComDoacoes[]): number {
    return acoes
      .flatMap(acao => acao.doacoes.filter(d => d.tipo === 'Dinheiro'))
      .reduce((acc, d) => acc + d.valor, 0);
  }

  private totalONGs(acoes: AcaoComDoacoes[]): number {
    return new Set(
        acoes
            .filter(acao => acao.doacoes.length > 0) 
            .map(acao => acao.nomeOng)
    ).size;
  }

  private porcentagemEngajados(acoes: AcaoComDoacoes[], numColaboradores: number): number {
    const voluntarios = acoes.flatMap(acao => acao.doacoes.filter(d => d.tipo === 'Serviço')).length;
    return numColaboradores > 0 ? (voluntarios / numColaboradores) * 100 : 0;
  }

  calcularPontuacao(empresa: EmpresaComAcoesEDoacoes) {
    const qtdODS = Array.isArray((empresa as any).odsId) ? (empresa as any).odsId.length : 0;

    const acoesComDoacoesAprovadas = empresa.acoes.map(acao => ({
            ...acao,
            doacoes: acao.doacoes.filter(doacao => doacao.status === 'Aprovada')
        }));

    const pontODS = this.pontuacaoPorODS(qtdODS);
    const pontONGs = this.pontuacaoPorONGs(acoesComDoacoesAprovadas);
    const pontEngajamento = this.pontuacaoPorEngajamento(acoesComDoacoesAprovadas, empresa.numColaboradores);
    const pontValorDoado = this.pontuacaoPorValorDoado(this.totalDoadoEmDinheiro(acoesComDoacoesAprovadas));

    const pontuacaoTotal = pontODS + pontONGs + pontEngajamento + pontValorDoado;

    let nivelSelo: string;
    if (pontuacaoTotal >= 75) {
      nivelSelo = 'Ouro';
    } else if (pontuacaoTotal >= 46) {
      nivelSelo = 'Prata';
    } else if (pontuacaoTotal >= 5) {
      nivelSelo = 'Bronze';
    } else {
      nivelSelo = 'Bronze';
    }

    return {
      empresaId: empresa.id,
      pontuacaoTotal,
      nivelSelo,
      valorTotalDoado: this.totalDoadoEmDinheiro(acoesComDoacoesAprovadas).toFixed(2),
      criterios: [
        { nome: 'ODSs com atuação', pontuacao: pontODS, detalhe: `${qtdODS} ODSs` },
        { nome: 'ONGs atingidas', pontuacao: pontONGs, detalhe: `${this.totalONGs(acoesComDoacoesAprovadas)} ONGs` },
        { nome: 'Colaboradores engajados (voluntariado)', pontuacao: pontEngajamento, detalhe: `${this.porcentagemEngajados(acoesComDoacoesAprovadas, empresa.numColaboradores).toFixed(1)}% estimado` },
        { nome: 'Valor total doado (R$)', pontuacao: pontValorDoado, detalhe: `R$ ${this.totalDoadoEmDinheiro(acoesComDoacoesAprovadas).toFixed(2)}` }
      ]
    };
  }
}