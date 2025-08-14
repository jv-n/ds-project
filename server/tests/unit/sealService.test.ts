// tests/unit/sealService.test.ts

import { SealService } from '../../src/services/sealService'; // Ajuste o caminho se necessário
import { EmpresaComAcoesEDoacoes } from '../../src/repositories/sealRepository'; // Ajuste o caminho se necessário

// Objeto base para um mock de empresa, para evitar repetição nos testes
const baseMockEmpresa: EmpresaComAcoesEDoacoes = {
  id: 1,
  nome: 'Empresa de Teste',
  pontuacao: 0,
  numColaboradores: 100,
  usuarioId: 1,
  odsId: [],
  acoes: [],
  selos: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('SealService Unit Tests', () => {
  let sealService: SealService;

  beforeEach(() => {
    sealService = new SealService();
  });

  describe('calcularPontuacao', () => {
    // Teste 1: O cenário mais importante - valida a correção que fizemos.
    test('DEVE calcular a pontuação corretamente, ignorando doações "reprovadas" e "pendentes"', () => {
      // ARRANGE
      const mockEmpresa: EmpresaComAcoesEDoacoes = {
        ...baseMockEmpresa,
        odsId: [1, 2, 3], // 3 ODSs = 10 pts
        numColaboradores: 10,
        acoes: [
          {
            acaoId: 101,
            empresaId: 1,
            nome: 'Ação Mista',
            nomeOng: 'ONG Aprovada',
            odsAcao: [1],
            descricao: '...', emailOng: '...', telefoneOng: '...',
            doacoes: [
              { id: 1, status: 'aprovado', valor: 5000, tipo: 'DINHEIRO', data: new Date(), acaoId: 101, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: null }, // CONTA (R$ 5000)
              { id: 2, status: 'reprovado', valor: 2000, tipo: 'DINHEIRO', data: new Date(), acaoId: 101, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: 'Inválido' }, // NÃO CONTA
              { id: 3, status: 'aprovado', valor: 1, tipo: 'SERVICO', data: new Date(), acaoId: 101, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: null }, // CONTA (1 voluntário)
              { id: 4, status: 'pendente', valor: 1, tipo: 'SERVICO', data: new Date(), acaoId: 101, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: null }, // NÃO CONTA
            ],
          },
          {
            acaoId: 102,
            empresaId: 1,
            nome: 'Ação Reprovada',
            nomeOng: 'ONG Ignorada', // Esta ONG não deve ser contada
            odsAcao: [2],
            descricao: '...', emailOng: '...', telefoneOng: '...',
            doacoes: [
              { id: 5, status: 'reprovado', valor: 1000, tipo: 'DINHEIRO', data: new Date(), acaoId: 102, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: 'Fora do escopo' },
            ],
          },
        ],
      };
      
      /* CÁLCULO ESPERADO:
       * ODSs: 3 ODSs => 10 pts
       * ONGs: Apenas 'ONG Aprovada' é contada (1 ONG) => 7 pts
       * Engajamento: 1 voluntário / 10 colaboradores = 10% => 6 pts
       * Valor Doado: R$ 5000 => 1 pt
       * TOTAL: 10 + 7 + 6 + 1 = 24 pontos
       */

      // ACT
      const resultado = sealService.calcularPontuacao(mockEmpresa);

      // ASSERT
      expect(resultado.pontuacaoTotal).toBe(24);
      expect(resultado.nivelSelo).toBe('bronzemedal');
      expect(resultado.valorTotalDoado).toBe('5000.00');
      expect(resultado.criterios[1].detalhe).toContain('1 ONGs'); // Confirma que a 'ONG Ignorada' não entrou
    });

    // Teste 2: Empresa "zerada", sem nenhuma ação social.
    test('DEVE retornar pontuação zero para uma empresa sem ODSs e sem ações', () => {
      // ARRANGE
      const mockEmpresa: EmpresaComAcoesEDoacoes = { ...baseMockEmpresa };

      // ACT
      const resultado = sealService.calcularPontuacao(mockEmpresa);

      // ASSERT
      expect(resultado.pontuacaoTotal).toBe(0);
      expect(resultado.valorTotalDoado).toBe('0.00');
      // A lógica atual sempre retorna 'bronzemedal' para pontuações baixas.
      expect(resultado.nivelSelo).toBe('bronzemedal');
    });
    
    // Teste 3: Caso crítico de divisão por zero no cálculo de engajamento.
    test('DEVE calcular a pontuação de engajamento como zero se a empresa não tiver colaboradores', () => {
      // ARRANGE
      const mockEmpresa: EmpresaComAcoesEDoacoes = {
        ...baseMockEmpresa,
        numColaboradores: 0, // Cenário crítico
        acoes: [{
            acaoId: 1, empresaId: 1, nome: 'Ação', nomeOng: 'ONG', odsAcao: [1], descricao: '...', emailOng: '...', telefoneOng: '...',
            doacoes: [{ id: 1, status: 'aprovado', valor: 1, tipo: 'SERVICO', data: new Date(), acaoId: 1, empresaId: 1, createdAt: new Date(), updatedAt: new Date(), documentos: [], motivoReprovacao: null }],
        }]
      };

      // ACT
      const resultado = sealService.calcularPontuacao(mockEmpresa);

      // ASSERT
      const engajamento = resultado.criterios.find(c => c.nome.includes('Colaboradores'));
      expect(engajamento?.pontuacao).toBe(0);
      expect(engajamento?.detalhe).toContain('0.0%');
    });

    // Teste 4: Testando os limites exatos para as faixas de selo.
    describe('Limites de Nível de Selo', () => {
      it('DEVE retornar "bronzemedal" para pontuação 45', () => {
        // Pontuação mockada através do número de ODSs.
        const mockEmpresa = { ...baseMockEmpresa, odsId: [1,2,3,4,5,6,7,8,9,10] }; // 33pts
        jest.spyOn((sealService as any), 'pontuacaoPorONGs').mockReturnValue(12); // 33 + 12 = 45

        const resultado = sealService.calcularPontuacao(mockEmpresa);
        expect(resultado.pontuacaoTotal).toBe(45);
        expect(resultado.nivelSelo).toBe('bronzemedal');
      });

      it('DEVE retornar "silvermedal" para pontuação 46', () => {
        const mockEmpresa = { ...baseMockEmpresa, odsId: [1,2,3,4,5,6,7,8,9,10] }; // 33pts
        jest.spyOn((sealService as any), 'pontuacaoPorONGs').mockReturnValue(13); // 33 + 13 = 46

        const resultado = sealService.calcularPontuacao(mockEmpresa);
        expect(resultado.pontuacaoTotal).toBe(46);
        expect(resultado.nivelSelo).toBe('silvermedal');
      });

      it('DEVE retornar "silvermedal" para pontuação 74', () => {
         const mockEmpresa = { ...baseMockEmpresa, odsId: [1,2,3,4,5,6,7,8,9,10] }; // 33pts
        jest.spyOn((sealService as any), 'pontuacaoPorONGs').mockReturnValue(30); // 33 + 30 = 63
        jest.spyOn((sealService as any), 'pontuacaoPorEngajamento').mockReturnValue(11); // 63 + 11 = 74

        const resultado = sealService.calcularPontuacao(mockEmpresa);
        expect(resultado.pontuacaoTotal).toBe(74);
        expect(resultado.nivelSelo).toBe('silvermedal');
      });

      it('DEVE retornar "goldenmedal" para pontuação 75', () => {
         const mockEmpresa = { ...baseMockEmpresa, odsId: [1,2,3,4,5,6,7,8,9,10] }; // 33pts
        jest.spyOn((sealService as any), 'pontuacaoPorONGs').mockReturnValue(30); // 63
        jest.spyOn((sealService as any), 'pontuacaoPorEngajamento').mockReturnValue(12); // 75

        const resultado = sealService.calcularPontuacao(mockEmpresa);
        expect(resultado.pontuacaoTotal).toBe(75);
        expect(resultado.nivelSelo).toBe('goldenmedal');
      });
    });

    // Teste 5: Cenário com múltiplas ações para a mesma ONG.
    test('DEVE contar uma ONG apenas uma vez, mesmo que ela participe de múltiplas ações', () => {
        // ARRANGE
        const mockEmpresa: EmpresaComAcoesEDoacoes = {
            ...baseMockEmpresa,
            acoes: [
                { acaoId: 1, empresaId: 1, nome: 'Ação 1', nomeOng: 'ONG Unica', odsAcao: [], descricao: '...', emailOng: '...', telefoneOng: '...', doacoes: [{ status: 'aprovado' } as any] },
                { acaoId: 2, empresaId: 1, nome: 'Ação 2', nomeOng: 'ONG Unica', odsAcao: [], descricao: '...', emailOng: '...', telefoneOng: '...', doacoes: [{ status: 'aprovado' } as any] },
                { acaoId: 3, empresaId: 1, nome: 'Ação 3', nomeOng: 'Outra ONG', odsAcao: [], descricao: '...', emailOng: '...', telefoneOng: '...', doacoes: [{ status: 'aprovado' } as any] }
            ]
        };
        // 2 ONGs únicas -> 7 pontos

        // ACT
        const resultado = sealService.calcularPontuacao(mockEmpresa);
        
        // ASSERT
        const ongs = resultado.criterios.find(c => c.nome.includes('ONGs'));
        expect(ongs?.pontuacao).toBe(7);
        expect(ongs?.detalhe).toContain('2 ONGs');
    });

    // Teste 6: Empresa sem doações em dinheiro, apenas voluntariado.
    test('DEVE calcular a pontuação de valor doado como zero se houver apenas doações de serviço', () => {
      // ARRANGE
      const mockEmpresa: EmpresaComAcoesEDoacoes = {
        ...baseMockEmpresa,
        numColaboradores: 20,
        acoes: [{
            acaoId: 1, empresaId: 1, nome: 'Ação Voluntária', nomeOng: 'ONG Voluntaria', odsAcao: [1], descricao: '...', emailOng: '...', telefoneOng: '...',
            // 2 voluntários de 20 = 10% de engajamento -> 6 pontos
            doacoes: [
              { id: 1, status: 'aprovado', valor: 1, tipo: 'SERVICO' } as any,
              { id: 2, status: 'aprovado', valor: 1, tipo: 'SERVICO' } as any,
            ],
        }]
      };

      // ACT
      const resultado = sealService.calcularPontuacao(mockEmpresa);

      // ASSERT
      const valorDoado = resultado.criterios.find(c => c.nome.includes('Valor total doado'));
      const engajamento = resultado.criterios.find(c => c.nome.includes('Colaboradores'));
      
      expect(resultado.valorTotalDoado).toBe('0.00');
      expect(valorDoado?.pontuacao).toBe(0);
      expect(engajamento?.pontuacao).toBe(6);
    });

  });
});