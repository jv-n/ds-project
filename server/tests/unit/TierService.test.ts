import { TierService } from '../../src/services/TierService';

describe('TierService', () => {
  const service = new TierService();

  it('deve retornar Ouro quando pontuação >= 75', () => {
    const result = service.calculateTier({
      totalDonated: 60000,
      supportedNgos: 10,
      supportedSdgs: 12
    });
    expect(result.tier).toBe('Ouro');
    expect(result.totalScore).toBeGreaterThanOrEqual(75);
  });

  it('deve retornar Prata quando pontuação >= 46 e < 75', () => {
    const result = service.calculateTier({
      totalDonated: 20000,
      supportedNgos: 5,
      supportedSdgs: 5
    });
    expect(result.tier).toBe('Prata');
  });

  it('deve retornar Bronze quando pontuação >= 5 e < 46', () => {
    const result = service.calculateTier({
      totalDonated: 1500,
      supportedNgos: 1,
      supportedSdgs: 1
    });
    expect(result.tier).toBe('Bronze');
  });

  it('deve retornar Nenhum quando pontuação < 5', () => {
    const result = service.calculateTier({
      totalDonated: 0,
      supportedNgos: 0,
      supportedSdgs: 0
    });
    expect(result.tier).toBe('Nenhum');
    expect(result.totalScore).toBe(0);
  });
});
