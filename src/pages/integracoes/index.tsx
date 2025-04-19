import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { Hub as IntegrationIcon } from '@mui/icons-material';
import IntegrationCard from '@/components/IntegrationCard';
import { PaymentConfig, MarketingConfig, EcommerceConfig } from '@/components/IntegrationConfig';
import { useIntegrations } from '@/hooks/useIntegrations';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`integration-tabpanel-${index}`}
      aria-labelledby={`integration-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface IntegrationConfig {
  // Campos comuns
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  webhookUrl?: string;
  storeUrl?: string;

  // Campos específicos de pagamento
  merchantId?: string;
  secretKey?: string;

  // Campos específicos de e-commerce
  syncInterval?: string;
  syncProducts?: boolean;
  syncOrders?: boolean;
  syncCustomers?: boolean;
  syncInventory?: boolean;
  notifyCustomer?: boolean;

  // Campos específicos de marketing
  campaignId?: string;
  adAccountId?: string;
  pixelId?: string;

  // Permite campos adicionais
  [key: string]: string | boolean | undefined;
}

export default function Integracoes() {
  const {
    integrations,
    connect,
    disconnect
  } = useIntegrations();

  const [tabValue, setTabValue] = useState(0);
  const [configDialog, setConfigDialog] = useState<{
    open: boolean;
    platform: string;
    type: 'payment' | 'marketing' | 'ecommerce';
  }>({
    open: false,
    platform: '',
    type: 'payment'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleConnect = (platform: string, type: 'payment' | 'marketing' | 'ecommerce') => {
    setConfigDialog({
      open: true,
      platform,
      type
    });
  };

  const handleDisconnect = async (platform: string) => {
    try {
      const success = await disconnect(platform);
      
      setSnackbar({
        open: true,
        message: success
          ? `Desconectado de ${platform} com sucesso`
          : `Erro ao desconectar de ${platform}`,
        severity: success ? 'success' : 'error'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao desconectar de ${platform}`,
        severity: 'error'
      });
    }
  };

  const handleCloseConfig = () => {
    setConfigDialog({
      open: false,
      platform: '',
      type: 'payment'
    });
  };

  const handleSaveConfig = async (platform: string, config: IntegrationConfig) => {
    try {
      const success = await connect(platform, config);
      
      setSnackbar({
        open: true,
        message: success
          ? `Conectado a ${platform} com sucesso`
          : `Erro ao conectar com ${platform}`,
        severity: success ? 'success' : 'error'
      });

      if (success) {
        handleCloseConfig();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao conectar com ${platform}`,
        severity: 'error'
      });
    }
  };

  const renderConfigDialog = () => {
    switch (configDialog.type) {
      case 'payment':
        return (
          <PaymentConfig
            open={configDialog.open}
            onClose={handleCloseConfig}
            platform={configDialog.platform}
            onSave={(config) => handleSaveConfig(configDialog.platform, config)}
          />
        );
      case 'marketing':
        return (
          <MarketingConfig
            open={configDialog.open}
            onClose={handleCloseConfig}
            platform={configDialog.platform}
            onSave={(config) => handleSaveConfig(configDialog.platform, config)}
          />
        );
      case 'ecommerce':
        return (
          <EcommerceConfig
            open={configDialog.open}
            onClose={handleCloseConfig}
            platform={configDialog.platform}
            onSave={(config) => handleSaveConfig(configDialog.platform, config)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IntegrationIcon sx={{ mr: 2 }} />
        <Typography variant="h4" component="h1">
          Integrações
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="integration tabs"
            variant="fullWidth"
          >
            <Tab label="Pagamentos" />
            <Tab label="E-commerce" />
            <Tab label="Marketing" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {integrations.pagamentos.map((integracao) => (
              <Grid item xs={12} sm={6} md={4} key={integracao.name}>
                <IntegrationCard
                  {...integracao}
                  onConnect={() => handleConnect(integracao.name, 'payment')}
                  onDisconnect={() => handleDisconnect(integracao.name)}
                  onConfigure={() => handleConnect(integracao.name, 'payment')}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {integrations.ecommerce.map((integracao) => (
              <Grid item xs={12} sm={6} md={4} key={integracao.name}>
                <IntegrationCard
                  {...integracao}
                  onConnect={() => handleConnect(integracao.name, 'ecommerce')}
                  onDisconnect={() => handleDisconnect(integracao.name)}
                  onConfigure={() => handleConnect(integracao.name, 'ecommerce')}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {integrations.marketing.map((integracao) => (
              <Grid item xs={12} sm={6} md={4} key={integracao.name}>
                <IntegrationCard
                  {...integracao}
                  onConnect={() => handleConnect(integracao.name, 'marketing')}
                  onDisconnect={() => handleDisconnect(integracao.name)}
                  onConfigure={() => handleConnect(integracao.name, 'marketing')}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>

      {renderConfigDialog()}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
} 