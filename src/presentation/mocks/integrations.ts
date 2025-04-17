export interface Integration {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isConnected: boolean;
}

export const mockIntegrations: Integration[] = [
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    description: 'Gerencie suas campanhas no Facebook e Instagram Ads',
    imageUrl: '/images/facebook-ads.png',
    isConnected: false
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Otimize suas campanhas na rede de pesquisa e display do Google',
    imageUrl: '/images/google-ads.png',
    isConnected: false
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    description: 'Alcance seu público-alvo na plataforma que mais cresce',
    imageUrl: '/images/tiktok-ads.png',
    isConnected: false
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    description: 'Otimize suas campanhas B2B no LinkedIn.',
    imageUrl: '/images/integrations/linkedin-ads.png',
    isConnected: false
  },
  {
    id: 'twitter-ads',
    name: 'Twitter Ads',
    description: 'Gerencie suas campanhas publicitárias no Twitter.',
    imageUrl: '/images/integrations/twitter-ads.png',
    isConnected: false
  },
  {
    id: 'pinterest-ads',
    name: 'Pinterest Ads',
    description: 'Otimize suas campanhas visuais no Pinterest.',
    imageUrl: '/images/integrations/pinterest-ads.png',
    isConnected: false
  }
]; 