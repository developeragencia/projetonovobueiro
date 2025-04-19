import { useState, useCallback } from 'react';
import { integrationService } from '@/services/integrations';

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

interface Integration {
  name: string;
  description: string;
  imageUrl: string;
  status: 'connected' | 'disconnected';
}

type IntegrationType = {
  [K in 'pagamentos' | 'ecommerce' | 'marketing']: Integration[];
};

interface UseIntegrationsReturn {
  integrations: {
    pagamentos: Integration[];
    ecommerce: Integration[];
    marketing: Integration[];
  };
  connect: (platform: string, config: IntegrationConfig) => Promise<boolean>;
  disconnect: (platform: string) => Promise<boolean>;
  updateConfig: (platform: string, config: IntegrationConfig) => Promise<boolean>;
  isConnected: (platform: string) => boolean;
  getConfig: (platform: string) => IntegrationConfig | undefined;
}

export function useIntegrations(): UseIntegrationsReturn {
  const [integrations, setIntegrations] = useState<IntegrationType>({
    pagamentos: [
      {
        name: 'Hubla',
        description: 'Gestão financeira completa para seu negócio',
        imageUrl: '/images/hubla.png',
        status: 'disconnected'
      },
      {
        name: 'Monetizze',
        description: 'Plataforma de afiliados e produtos digitais',
        imageUrl: '/images/monetizze.png',
        status: 'disconnected'
      },
      {
        name: 'InovaPag',
        description: 'Soluções inovadoras em pagamentos',
        imageUrl: '/images/inovapag.png',
        status: 'disconnected'
      },
      {
        name: 'Perfect Pay',
        description: 'Checkout transparente e seguro',
        imageUrl: '/images/perfectpay.png',
        status: 'disconnected'
      }
    ],
    ecommerce: [
      {
        name: 'WooCommerce',
        description: 'Plataforma de e-commerce para WordPress',
        imageUrl: '/images/woocommerce.png',
        status: 'disconnected'
      },
      {
        name: 'Logzz',
        description: 'Logística integrada para e-commerce',
        imageUrl: '/images/logzz.png',
        status: 'disconnected'
      }
    ],
    marketing: [
      {
        name: 'Facebook Ads',
        description: 'Plataforma de anúncios do Facebook',
        imageUrl: '/images/facebook.png',
        status: 'disconnected'
      },
      {
        name: 'Google Ads',
        description: 'Plataforma de anúncios do Google',
        imageUrl: '/images/google.png',
        status: 'disconnected'
      },
      {
        name: 'TikTok Ads',
        description: 'Plataforma de anúncios do TikTok',
        imageUrl: '/images/tiktok.png',
        status: 'disconnected'
      }
    ]
  });

  const updateIntegrationStatus = useCallback((platform: string, newStatus: 'connected' | 'disconnected') => {
    setIntegrations(prev => {
      const newState = { ...prev };
      
      Object.keys(newState).forEach(category => {
        const index = newState[category as keyof typeof newState].findIndex(
          integration => integration.name === platform
        );
        
        if (index !== -1) {
          newState[category as keyof typeof newState][index] = {
            ...newState[category as keyof typeof newState][index],
            status: newStatus
          };
        }
      });
      
      return newState;
    });
  }, []);

  const connect = useCallback(async (platform: string, config: IntegrationConfig) => {
    try {
      const success = await integrationService.connect(platform, config);
      
      if (success) {
        updateIntegrationStatus(platform, 'connected');
      }
      
      return success;
    } catch (error) {
      console.error('Error connecting to platform:', error);
      return false;
    }
  }, [updateIntegrationStatus]);

  const disconnect = useCallback(async (platform: string) => {
    try {
      const success = await integrationService.disconnect(platform);
      
      if (success) {
        updateIntegrationStatus(platform, 'disconnected');
      }
      
      return success;
    } catch (error) {
      console.error('Error disconnecting from platform:', error);
      return false;
    }
  }, [updateIntegrationStatus]);

  const updateConfig = useCallback(async (platform: string, config: IntegrationConfig) => {
    try {
      return await integrationService.updateConfig(platform, config);
    } catch (error) {
      console.error('Error updating platform config:', error);
      return false;
    }
  }, []);

  const isConnected = useCallback((platform: string) => {
    return integrationService.isConnected(platform);
  }, []);

  const getConfig = useCallback((platform: string) => {
    return integrationService.getConfig(platform);
  }, []);

  return {
    integrations,
    connect,
    disconnect,
    updateConfig,
    isConnected,
    getConfig
  };
} 