interface IntegrationConfig {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  webhookUrl?: string;
  storeUrl?: string;
  syncInterval?: string;
  syncProducts?: boolean;
  syncOrders?: boolean;
  syncCustomers?: boolean;
  syncInventory?: boolean;
  notifyCustomer?: boolean;
  [key: string]: string | boolean | undefined;
}

class IntegrationService {
  private static instance: IntegrationService;
  private integrationStatus: Map<string, boolean>;
  private integrationConfigs: Map<string, IntegrationConfig>;

  private constructor() {
    this.integrationStatus = new Map();
    this.integrationConfigs = new Map();
  }

  public static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  public async connect(platform: string, config: IntegrationConfig): Promise<boolean> {
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.integrationConfigs.set(platform, config);
      this.integrationStatus.set(platform, true);
      
      return true;
    } catch (error) {
      console.error('Error connecting to platform:', error);
      return false;
    }
  }

  public async disconnect(platform: string): Promise<boolean> {
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.integrationConfigs.delete(platform);
      this.integrationStatus.delete(platform);
      
      return true;
    } catch (error) {
      console.error('Error disconnecting from platform:', error);
      return false;
    }
  }

  public isConnected(platform: string): boolean {
    return this.integrationStatus.get(platform) || false;
  }

  public getConfig(platform: string): IntegrationConfig | undefined {
    return this.integrationConfigs.get(platform);
  }

  public async updateConfig(platform: string, config: IntegrationConfig): Promise<boolean> {
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.integrationConfigs.set(platform, config);
      
      return true;
    } catch (error) {
      console.error('Error updating platform config:', error);
      return false;
    }
  }

  public async testConnection(platform: string): Promise<boolean> {
    try {
      // Aqui você implementaria a lógica real de teste de conexão
      console.log(`Testando conexão com ${platform}`);
      
      const isConnected = this.isConnected(platform);
      const config = this.getConfig(platform);
      
      if (!isConnected || !config) {
        return false;
      }
      
      // Simulando um teste de conexão
      return true;
    } catch (error) {
      console.error(`Erro ao testar conexão com ${platform}:`, error);
      return false;
    }
  }
}

export const integrationService = IntegrationService.getInstance(); 