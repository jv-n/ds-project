import { TierService } from '../../src/services/TierService';

describe('TierService.calculateTier', () => {
  let service: TierService;

  beforeEach(() => {
    service = new TierService();
  });

  it('deve retornar "Nenhum" se todos os valores forem zero', () => {
    const result = service.calculateTier({
      totalDonated: 0,
      totalService: 0,
      supportedNgos: 0,
      supportedSdgs: 0
    });
    expect(result.tier).toBe('Nenhum');
    expect(result.totalScore).toBe(0);
  });

  it('deve retornar "bronze" se atingir apenas um critério mínimo', () => {
    const result = service.calculateTier({
      totalDonated: 5000,
      totalService: 0,
      supportedNgos: 0,
      supportedSdgs: 0
    });
    expect(result.totalScore).toBe(5);
    expect(result.tier).toBe('bronze');
  });

  it('deve retornar "golden" se atingir todos os critérios máximos', () => {
    const result = service.calculateTier({
      totalDonated: 999999,
      totalService: 999,
      supportedNgos: 50,
      supportedSdgs: 17
    });
    expect(result.tier).toBe('golden');
    expect(result.totalScore).toBeGreaterThanOrEqual(75);
  });

  it('deve considerar valores exatamente no limite como elegíveis', () => {
    const thresholds = [
      { totalDonated: 1000, totalService: 1, supportedNgos: 1, supportedSdgs: 1 },
      { totalDonated: 5000, totalService: 3, supportedNgos: 3, supportedSdgs: 3 },
      { totalDonated: 25000, totalService: 5, supportedNgos: 5, supportedSdgs: 7 },
      { totalDonated: 50000, totalService: 9, supportedNgos: 7, supportedSdgs: 10 },
    ];
    thresholds.forEach(data => {
      const result = service.calculateTier(data);
      expect(result.tier).not.toBe('Nenhum');
    });
  });

  it('deve tratar valores nulos/undefined/NaN como zero', () => {
    const result = service.calculateTier({
      totalDonated: null as any,
      totalService: undefined as any,
      supportedNgos: NaN as any,
      supportedSdgs: NaN as any,
    });
    expect(result.totalScore).toBe(0);
    expect(result.tier).toBe('Nenhum');
  });
});
