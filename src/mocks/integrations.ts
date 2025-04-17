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
    description: 'Gerencie suas campanhas no Facebook e Instagram Ads.',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Otimize suas campanhas no Google Ads e YouTube.',
    imageUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    description: 'Alcance seu público-alvo no TikTok.',
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    description: 'Anuncie para profissionais no LinkedIn.',
    imageUrl: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  },
  {
    id: 'twitter-ads',
    name: 'Twitter Ads',
    description: 'Promova seus tweets e alcance mais usuários.',
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  },
  {
    id: 'pinterest-ads',
    name: 'Pinterest Ads',
    description: 'Alcance usuários interessados em seus produtos.',
    imageUrl: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=200&h=200',
    isConnected: false
  }
]; 