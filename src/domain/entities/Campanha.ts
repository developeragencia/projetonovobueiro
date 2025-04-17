import { v4 as uuidv4 } from 'uuid';
import { MetricasCampanha } from '../value-objects/MetricasCampanha';
import { StatusCampanha } from '../value-objects/StatusCampanha';
import { PlataformaAnuncio } from '../value-objects/PlataformaAnuncio';

export class Campanha {
  private readonly id: string;
  private status: StatusCampanha;
  private metricas: MetricasCampanha;
  private dataAtualizacao: Date;

  constructor(
    private readonly nome: string,
    private readonly idExterno: string,
    private readonly contaAnuncio: string,
    private readonly plataforma: PlataformaAnuncio,
    private orcamentoDiario: number,
    private configuracoes: Record<string, any>,
    status?: StatusCampanha
  ) {
    this.id = uuidv4();
    this.status = status || new StatusCampanha('ATIVA');
    this.metricas = new MetricasCampanha();
    this.dataAtualizacao = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getIdExterno(): string {
    return this.idExterno;
  }

  public getContaAnuncio(): string {
    return this.contaAnuncio;
  }

  public getPlataforma(): PlataformaAnuncio {
    return this.plataforma;
  }

  public getStatus(): StatusCampanha {
    return this.status;
  }

  public getMetricas(): MetricasCampanha {
    return this.metricas;
  }

  public getOrcamentoDiario(): number {
    return this.orcamentoDiario;
  }

  public getConfiguracoes(): Record<string, any> {
    return { ...this.configuracoes };
  }

  public atualizarMetricas(novasMetricas: MetricasCampanha): void {
    this.metricas = novasMetricas;
    this.dataAtualizacao = new Date();
  }

  public atualizarStatus(novoStatus: StatusCampanha): void {
    this.status = novoStatus;
    this.dataAtualizacao = new Date();
  }

  public atualizarOrcamento(novoOrcamento: number): void {
    if (novoOrcamento < 0) {
      throw new Error('Orçamento não pode ser negativo');
    }
    this.orcamentoDiario = novoOrcamento;
    this.dataAtualizacao = new Date();
  }

  public duplicar(novaContaAnuncio: string): Campanha {
    return new Campanha(
      `${this.nome} (Cópia)`,
      '', // ID externo será gerado pela plataforma
      novaContaAnuncio,
      this.plataforma,
      this.orcamentoDiario,
      { ...this.configuracoes }
    );
  }

  public isLucrativa(): boolean {
    return this.metricas.getROAS() > 1;
  }

  public getDataAtualizacao(): Date {
    return this.dataAtualizacao;
  }
} 