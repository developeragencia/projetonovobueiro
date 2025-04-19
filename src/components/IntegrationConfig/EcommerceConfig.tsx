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
  Alert,
  FormControlLabel,
  Switch
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

interface EcommerceConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: IntegrationConfig) => Promise<void>;
}

export const EcommerceConfig: React.FC<EcommerceConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState<IntegrationConfig>({
    apiKey: '',
    storeUrl: '',
    webhookUrl: '',
    syncProducts: true,
    syncOrders: true,
    syncCustomers: true,
    syncInventory: true,
    syncInterval: '60',
    notifyCustomer: true
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [field]: event.target.value
    });
  };

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [field]: event.target.checked
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
            Configurações da Loja
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
            label="URL da Loja"
            value={config.storeUrl}
            onChange={handleChange('storeUrl')}
            margin="normal"
            placeholder="https://sua-loja.com"
          />

          <TextField
            fullWidth
            label="URL do Webhook"
            value={config.webhookUrl}
            onChange={handleChange('webhookUrl')}
            margin="normal"
            placeholder="https://sua-api.com/webhook"
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Configurações de Sincronização
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={config.syncProducts}
                  onChange={handleSwitchChange('syncProducts')}
                  color="primary"
                />
              }
              label="Sincronizar Produtos"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={config.syncOrders}
                  onChange={handleSwitchChange('syncOrders')}
                  color="primary"
                />
              }
              label="Sincronizar Pedidos"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={config.syncCustomers}
                  onChange={handleSwitchChange('syncCustomers')}
                  color="primary"
                />
              }
              label="Sincronizar Clientes"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={config.syncInventory}
                  onChange={handleSwitchChange('syncInventory')}
                  color="primary"
                />
              }
              label="Sincronizar Estoque"
            />

            <TextField
              fullWidth
              label="Intervalo de Sincronização (minutos)"
              value={config.syncInterval}
              onChange={handleChange('syncInterval')}
              margin="normal"
              type="number"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={config.notifyCustomer}
                  onChange={handleSwitchChange('notifyCustomer')}
                  color="primary"
                />
              }
              label="Notificar Cliente"
            />
          </Box>
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