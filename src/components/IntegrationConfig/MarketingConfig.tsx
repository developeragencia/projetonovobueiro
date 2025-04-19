import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material';

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

interface MarketingConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: IntegrationConfig) => Promise<void>;
}

export const MarketingConfig: React.FC<MarketingConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState<IntegrationConfig>({
    apiKey: '',
    clientId: '',
    clientSecret: '',
    adAccountId: '',
    pixelId: '',
    campaignId: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await onSave(config);
    } catch (err) {
      setError('Ocorreu um erro ao salvar as configurações.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Configurar Integração - {platform}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="subtitle2" gutterBottom>
            Credenciais da API
          </Typography>

          <TextField
            fullWidth
            label="API Key"
            value={config.apiKey}
            onChange={handleChange('apiKey')}
            margin="normal"
            type="password"
          />

          <TextField
            fullWidth
            label="Client ID"
            value={config.clientId}
            onChange={handleChange('clientId')}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Client Secret"
            value={config.clientSecret}
            onChange={handleChange('clientSecret')}
            margin="normal"
            type="password"
          />

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Configurações da Conta
          </Typography>

          <TextField
            fullWidth
            label="ID da Conta de Anúncios"
            value={config.adAccountId}
            onChange={handleChange('adAccountId')}
            margin="normal"
          />

          <TextField
            fullWidth
            label="ID do Pixel"
            value={config.pixelId}
            onChange={handleChange('pixelId')}
            margin="normal"
          />

          <TextField
            fullWidth
            label="ID da Campanha"
            value={config.campaignId}
            onChange={handleChange('campaignId')}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 