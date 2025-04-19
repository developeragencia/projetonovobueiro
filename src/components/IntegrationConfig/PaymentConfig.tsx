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

interface PaymentConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: IntegrationConfig) => Promise<void>;
}

export const PaymentConfig: React.FC<PaymentConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState<IntegrationConfig>({
    apiKey: '',
    merchantId: '',
    secretKey: ''
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
            label="Merchant ID"
            value={config.merchantId}
            onChange={handleChange('merchantId')}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Secret Key"
            value={config.secretKey}
            onChange={handleChange('secretKey')}
            margin="normal"
            type="password"
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