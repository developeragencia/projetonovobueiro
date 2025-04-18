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
import { integrationService } from '@/services/integrations';

interface MarketingConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: any) => Promise<void>;
}

export const MarketingConfig: React.FC<MarketingConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState({
    apiKey: '',
    clientId: '',
    clientSecret: '',
    accountId: '',
    accessToken: '',
    refreshToken: '',
    autoSync: true,
    syncInterval: '30'
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

          <TextField
            fullWidth
            label="Account ID"
            value={config.accountId}
            onChange={handleChange('accountId')}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Access Token"
            value={config.accessToken}
            onChange={handleChange('accessToken')}
            margin="normal"
            type="password"
          />

          <TextField
            fullWidth
            label="Refresh Token"
            value={config.refreshToken}
            onChange={handleChange('refreshToken')}
            margin="normal"
            type="password"
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Configurações de Sincronização
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={config.autoSync}
                  onChange={handleSwitchChange('autoSync')}
                  color="primary"
                />
              }
              label="Sincronização Automática"
            />

            <TextField
              fullWidth
              label="Intervalo de Sincronização (minutos)"
              value={config.syncInterval}
              onChange={handleChange('syncInterval')}
              margin="normal"
              type="number"
              disabled={!config.autoSync}
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