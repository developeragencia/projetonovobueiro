export class MetricasCampanha {
  constructor(
    private readonly impressoes: number = 0,
    private readonly cliques: number = 0,
    private readonly gastos: number = 0,
    private readonly conversoes: number = 0,
    private readonly valorConversoes: number = 0
  ) {
    this.validarMetricas();
  }

  private validarMetricas(): void {
    if (this.impressoes < 0) throw new Error('Impressões não podem ser negativas');
    if (this.cliques < 0) throw new Error('Cliques não podem ser negativos');
    if (this.gastos < 0) throw new Error('Gastos não podem ser negativos');
    if (this.conversoes < 0) throw new Error('Conversões não podem ser negativas');
    if (this.valorConversoes < 0) throw new Error('Valor de conversões não pode ser negativo');
    if (this.cliques > this.impressoes) throw new Error('Cliques não podem ser maiores que impressões');
  }

  public getImpressoes(): number {
    return this.impressoes;
  }

  public getCliques(): number {
    return this.cliques;
  }

  public getGastos(): number {
    return this.gastos;
  }

  public getConversoes(): number {
    return this.conversoes;
  }

  public getValorConversoes(): number {
    return this.valorConversoes;
  }

  public getCTR(): number {
    if (this.impressoes === 0) return 0;
    return (this.cliques / this.impressoes) * 100;
  }

  public getCPC(): number {
    if (this.cliques === 0) return 0;
    return this.gastos / this.cliques;
  }

  public getCPM(): number {
    if (this.impressoes === 0) return 0;
    return (this.gastos / this.impressoes) * 1000;
  }

  public getTaxaConversao(): number {
    if (this.cliques === 0) return 0;
    return (this.conversoes / this.cliques) * 100;
  }

  public getCPA(): number {
    if (this.conversoes === 0) return 0;
    return this.gastos / this.conversoes;
  }

  public getROAS(): number {
    if (this.gastos === 0) return 0;
    return this.valorConversoes / this.gastos;
  }

  public getLucro(): number {
    return this.valorConversoes - this.gastos;
  }

  public getMargemLucro(): number {
    if (this.valorConversoes === 0) return 0;
    return (this.getLucro() / this.valorConversoes) * 100;
  }
} 