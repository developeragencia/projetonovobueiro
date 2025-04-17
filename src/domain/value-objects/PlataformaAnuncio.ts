export type TipoPlataformaAnuncio = 'FACEBOOK' | 'INSTAGRAM' | 'GOOGLE_ADS' | 'TIKTOK_ADS';

export class PlataformaAnuncio {
  constructor(private readonly valor: TipoPlataformaAnuncio) {
    this.validar(valor);
  }

  private validar(plataforma: TipoPlataformaAnuncio): void {
    const plataformasValidas: TipoPlataformaAnuncio[] = [
      'FACEBOOK',
      'INSTAGRAM',
      'GOOGLE_ADS',
      'TIKTOK_ADS'
    ];

    if (!plataformasValidas.includes(plataforma)) {
      throw new Error(`Plataforma inválida. Plataformas permitidas: ${plataformasValidas.join(', ')}`);
    }
  }

  public getValor(): TipoPlataformaAnuncio {
    return this.valor;
  }

  public toString(): string {
    return this.valor;
  }

  public equals(other: PlataformaAnuncio): boolean {
    return this.valor === other.valor;
  }

  public isFacebook(): boolean {
    return this.valor === 'FACEBOOK';
  }

  public isInstagram(): boolean {
    return this.valor === 'INSTAGRAM';
  }

  public isGoogleAds(): boolean {
    return this.valor === 'GOOGLE_ADS';
  }

  public isTikTokAds(): boolean {
    return this.valor === 'TIKTOK_ADS';
  }

  public isMetaAds(): boolean {
    return this.isFacebook() || this.isInstagram();
  }
} 