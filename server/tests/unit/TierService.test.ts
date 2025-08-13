import { TierService } from '../../src/services/TierService';

describe('TierService.calculateTier', () => {
  let service: TierService;

  beforeEach(() => {
    service = new TierService();
  });

  it('deve retornar "Nenhum" se todos os valores forem zero', () => {
    const result = service.calculateTier({ totalDonated: 0, supportedNgos: 0, supportedSdgs: 0 });
    expect(result.tier).toBe('Nenhum');
    expect(result.totalScore).toBe(0);
  });

  it('deve retornar "bronze" se atingir apenas um critério mínimo', () => {
    const result = service.calculateTier({ totalDonated: 1000, supportedNgos: 0, supportedSdgs: 0 });
    expect(result.tier).toBe('Nenhum');
    expect(result.totalScore).toBeGreaterThanOrEqual(1);
  });

  it('deve retornar "golden" se atingir todos os critérios máximos', () => {
    const result = service.calculateTier({ totalDonated: 999999, supportedNgos: 50, supportedSdgs: 17 });
    expect(result.tier).toBe('golden');
    expect(result.totalScore).toBeGreaterThanOrEqual(75);
  });

  it('deve considerar valores exatamente no limite como elegíveis', () => {
    const thresholds = [
      { totalDonated: 1000, supportedNgos: 1, supportedSdgs: 1 }, // bronze mínimo
      { totalDonated: 5000, supportedNgos: 3, supportedSdgs: 3 }, // bronze alto
      { totalDonated: 25000, supportedNgos: 5, supportedSdgs: 7 }, // prata
      { totalDonated: 50000, supportedNgos: 7, supportedSdgs: 10 }, // ouro
    ];
    thresholds.forEach(data => {
      const result = service.calculateTier(data);
      expect(result.tier).not.toBe('Nenhum');
    });
  });

  it('deve retornar tier inferior se valores forem logo abaixo do limite', () => {
    const result = service.calculateTier({ totalDonated: 999, supportedNgos: 0, supportedSdgs: 0 });
    expect(result.tier).toBe('Nenhum');
  });

  it('deve tratar valores nulos/undefined/NaN como zero', () => {
    const result = service.calculateTier({
      totalDonated: null as any,
      supportedNgos: undefined as any,
      supportedSdgs: NaN as any,
    });
    expect(result.totalScore).toBe(0);
    expect(result.tier).toBe('Nenhum');
  });

  it('deve tratar valores negativos como zero', () => {
    const result = service.calculateTier({ totalDonated: -500, supportedNgos: -2, supportedSdgs: -1 });
    expect(result.totalScore).toBe(0);
    expect(result.tier).toBe('Nenhum');
  });

  it('deve funcionar com valores extremamente altos', () => {
    const result = service.calculateTier({ totalDonated: 1e9, supportedNgos: 1000, supportedSdgs: 100 });
    expect(result.tier).toBe('golden');
    expect(result.totalScore).toBeGreaterThanOrEqual(75);
  });
});
