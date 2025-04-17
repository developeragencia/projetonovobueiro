export type TipoStatusCampanha = 'ATIVA' | 'PAUSADA' | 'ARQUIVADA' | 'REJEITADA' | 'EM_REVISAO';

export class StatusCampanha {
  constructor(private readonly valor: TipoStatusCampanha) {
    this.validar(valor);
  }

  private validar(status: TipoStatusCampanha): void {
    const statusValidos: TipoStatusCampanha[] = [
      'ATIVA',
      'PAUSADA',
      'ARQUIVADA',
      'REJEITADA',
      'EM_REVISAO'
    ];

    if (!statusValidos.includes(status)) {
      throw new Error(`Status inválido. Status permitidos: ${statusValidos.join(', ')}`);
    }
  }

  public getValor(): TipoStatusCampanha {
    return this.valor;
  }

  public toString(): string {
    return this.valor;
  }

  public equals(other: StatusCampanha): boolean {
    return this.valor === other.valor;
  }

  public isAtiva(): boolean {
    return this.valor === 'ATIVA';
  }

  public isPausada(): boolean {
    return this.valor === 'PAUSADA';
  }
} 