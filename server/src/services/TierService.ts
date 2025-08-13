interface IImpactData {
  totalDonated: number;
  supportedNgos: number;
  supportedSdgs: number;
}

export interface ITierResult {
  tier: 'golden' | 'silver' | 'bronze' | 'Nenhum';
  totalScore: number;
  points: {
    sdg: number;
    ngo: number;
    budget: number;
  };
}

export class TierService {
  private calculateSdgPoints(sdgCount: number): number {
    if (sdgCount > 9) return 40;
    if (sdgCount >= 7) return 32;
    if (sdgCount >= 5) return 24;
    if (sdgCount >= 3) return 16;
    if (sdgCount >= 1) return 8;
    return 0;
  }

  private calculateNgoPoints(ngoCount: number): number {
    if (ngoCount >= 7) return 32;
    if (ngoCount >= 5) return 24;
    if (ngoCount >= 3) return 16;
    if (ngoCount >= 1) return 8;
    return 0;
  }

  private calculateBudgetPoints(amount: number): number {
    if (amount >= 50000) return 28;
    if (amount >= 25000) return 19;
    if (amount >= 10000) return 13;
    if (amount >= 5000) return 7;
    if (amount >= 1000) return 1;
    return 0;
  }

  private getTierFromScore(score: number): ITierResult['tier'] {
    if (score >= 75) return 'golden';
    if (score >= 46) return 'silver';
    if (score >= 5) return 'bronze';
    return 'Nenhum';
  }

  /**
   * Método público principal que executa todos os cálculos.
   * @param data Os dados brutos de impacto do usuário.
   * @returns O objeto final com o tier, pontuação total e pontos detalhados.
   */
  
  public calculateTier(data: IImpactData): ITierResult {
    const sdgPoints = this.calculateSdgPoints(data.supportedSdgs);
    const ngoPoints = this.calculateNgoPoints(data.supportedNgos);
    const budgetPoints = this.calculateBudgetPoints(data.totalDonated);

    const totalScore = sdgPoints + ngoPoints + budgetPoints;
    const tier = this.getTierFromScore(totalScore);

    return {
      tier,
      totalScore,
      points: {
        sdg: sdgPoints,
        ngo: ngoPoints,
        budget: budgetPoints,
      },
    };
  }
}