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
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

interface EcommerceConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: any) => Promise<void>;
}

export const EcommerceConfig: React.FC<EcommerceConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState({
    apiKey: '',
    storeUrl: '',
    webhookUrl: '',
    syncProducts: true,
    syncOrders: true,
    syncCustomers: true,
    syncInventory: true,
    syncInterval: '60',
    orderStatus: ['pending', 'processing', 'completed'],
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

  const handleSelectChange = (event: any) => {
    setConfig({
      ...config,
      orderStatus: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await onSave(config);

      onClose();
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

            <FormControl fullWidth margin="normal">
              <InputLabel>Status dos Pedidos a Sincronizar</InputLabel>
              <Select
                multiple
                value={config.orderStatus}
                onChange={handleSelectChange}
                label="Status dos Pedidos a Sincronizar"
              >
                <MenuItem value="pending">Pendente</MenuItem>
                <MenuItem value="processing">Em Processamento</MenuItem>
                <MenuItem value="completed">Concluído</MenuItem>
                <MenuItem value="cancelled">Cancelado</MenuItem>
                <MenuItem value="refunded">Reembolsado</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={config.notifyCustomer}
                  onChange={handleSwitchChange('notifyCustomer')}
                  color="primary"
                />
              }
              label="Notificar Cliente sobre Atualizações"
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