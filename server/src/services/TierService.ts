interface IImpactData {
  totalDonated: number;
  totalService: number;
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
    service: number;
  };
}

export class TierService {
  private calculateSdgPoints(sdgCount: number): number {
    if (sdgCount > 9) return 33;
    if (sdgCount >= 7) return 25;
    if (sdgCount >= 5) return 18;
    if (sdgCount >= 3) return 12;
    if (sdgCount >= 1) return 7;
    return 0;
  }

  private calculateNgoPoints(ngoCount: number): number {
    if (ngoCount >= 7) return 30;
    if (ngoCount >= 5) return 22;
    if (ngoCount >= 3) return 14;
    if (ngoCount >= 1) return 8;
    return 0;
  }

  private calculateBudgetPoints(amount: number): number {
    if (amount >= 50000) return 20;
    if (amount >= 25000) return 11;
    if (amount >= 10000) return 8;
    if (amount >= 5000) return 5;
    if (amount >= 1000) return 1;
    return 0;
  }

  private calculateVolunterrPoints (amount: number): number {
    if(amount >= 13) return 17;
    if(amount >= 10) return 11;
    if(amount >= 7) return 7;
    if(amount >= 4) return 4;
    if(amount >= 1) return 2;
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
    const servicePoints = this.calculateVolunterrPoints(data.totalService);

    const totalScore = sdgPoints + ngoPoints + budgetPoints + servicePoints;
    const tier = this.getTierFromScore(totalScore);

    return {
      tier,
      totalScore,
      points: {
        sdg: sdgPoints,
        ngo: ngoPoints,
        budget: budgetPoints,
        service: servicePoints,
      },
    };
  }
}