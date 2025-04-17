import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Alert } from '@mui/material';
import IntegrationCard from '@/presentation/components/IntegrationCard';
import { mockIntegrations, Integration } from '@/mocks/integrations';

export const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    try {
      // Simulação de conexão com a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === id
            ? { ...integration, isConnected: true }
            : integration
        )
      );
    } catch (err) {
      setError('Erro ao conectar com a plataforma. Tente novamente.');
    }
  };

  const handleDisconnect = async (id: string) => {
    try {
      // Simulação de desconexão com a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === id
            ? { ...integration, isConnected: false }
            : integration
        )
      );
    } catch (err) {
      setError('Erro ao desconectar da plataforma. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Integrações
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Conecte suas plataformas de anúncios para gerenciar todas as campanhas em um só lugar.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {integrations.map(integration => (
            <Grid item xs={12} sm={6} md={4} key={integration.id}>
              <IntegrationCard
                integration={integration}
                onConnect={() => handleConnect(integration.id)}
                onDisconnect={() => handleDisconnect(integration.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default IntegrationsPage; 