import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  Chip,
  Container
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

interface SalesPlatform {
  id: string;
  name: string;
  logo: string;
  description: string;
  isConnected: boolean;
  status?: 'active' | 'error' | 'pending';
}

const salesPlatforms: SalesPlatform[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    logo: '/images/platforms/shopify.png',
    description: 'Plataforma de e-commerce completa',
    isConnected: false
  },
  {
    id: 'systeme',
    name: 'Systeme',
    logo: '/images/platforms/systeme.png',
    description: 'Plataforma de marketing digital',
    isConnected: false
  },
  {
    id: 'strivpay',
    name: 'StrivPay',
    logo: '/images/platforms/strivpay.png',
    description: 'Processamento de pagamentos',
    isConnected: false
  },
  {
    id: 'appmax',
    name: 'Appmax',
    logo: '/images/platforms/appmax.png',
    description: 'Gateway de pagamentos',
    isConnected: false
  },
  {
    id: 'pepper',
    name: 'Pepper',
    logo: '/images/platforms/pepper.png',
    description: 'Plataforma de vendas digitais',
    isConnected: false
  },
  {
    id: 'lojazz',
    name: 'LojaZZ',
    logo: '/images/platforms/lojazz.png',
    description: 'E-commerce e marketplace',
    isConnected: false
  },
  {
    id: 'maxweb',
    name: 'Maxweb',
    logo: '/images/platforms/maxweb.png',
    description: 'Plataforma de afiliados',
    isConnected: false
  },
  {
    id: 'digistore24',
    name: 'Digistore24',
    logo: '/images/platforms/digistore24.png',
    description: 'Marketplace internacional',
    isConnected: false
  },
  {
    id: 'fortpay',
    name: 'FortPay',
    logo: '/images/platforms/fortpay.png',
    description: 'Soluções de pagamento',
    isConnected: false
  },
  {
    id: 'clickbank',
    name: 'ClickBank',
    logo: '/images/platforms/clickbank.png',
    description: 'Marketplace de produtos digitais',
    isConnected: false
  },
  {
    id: 'cartpanda',
    name: 'CartPanda',
    logo: '/images/platforms/cartpanda.png',
    description: 'Carrinho inteligente',
    isConnected: false
  },
  {
    id: 'doppus',
    name: 'Doppus',
    logo: '/images/platforms/doppus.png',
    description: 'Pagamentos digitais',
    isConnected: false
  }
];

export const SalesIntegrations: React.FC = () => {
  const [platforms, setPlatforms] = useState<SalesPlatform[]>(salesPlatforms);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleConnect = async (platformId: string) => {
    try {
      // TODO: Implementar lógica de conexão com a plataforma
      setPlatforms(prev =>
        prev.map(platform =>
          platform.id === platformId
            ? { ...platform, isConnected: true, status: 'active' }
            : platform
        )
      );
      setSnackbar({
        open: true,
        message: 'Plataforma conectada com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao conectar com a plataforma',
        severity: 'error'
      });
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      // TODO: Implementar lógica de desconexão
      setPlatforms(prev =>
        prev.map(platform =>
          platform.id === platformId
            ? { ...platform, isConnected: false, status: undefined }
            : platform
        )
      );
      setSnackbar({
        open: true,
        message: 'Plataforma desconectada com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao desconectar plataforma',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Integrações com Plataformas de Vendas
        </Typography>
        <Typography color="text.secondary">
          Conecte suas plataformas de vendas para consolidar dados e rastrear vendas com precisão
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {platforms.map((platform) => (
          <Grid item xs={12} sm={6} md={4} key={platform.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{
                  height: 140,
                  objectFit: 'contain',
                  p: 2,
                  bgcolor: 'background.paper'
                }}
                image={platform.logo}
                alt={platform.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {platform.name}
                  </Typography>
                  {platform.status && (
                    <Chip
                      icon={platform.status === 'active' ? <CheckCircle /> : <Error />}
                      label={platform.status === 'active' ? 'Ativo' : 'Erro'}
                      color={platform.status === 'active' ? 'success' : 'error'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {platform.description}
                </Typography>
                <Button
                  variant={platform.isConnected ? "outlined" : "contained"}
                  color={platform.isConnected ? "error" : "primary"}
                  onClick={() => platform.isConnected 
                    ? handleDisconnect(platform.id)
                    : handleConnect(platform.id)
                  }
                  fullWidth
                >
                  {platform.isConnected ? 'Desconectar' : 'Conectar'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}; 