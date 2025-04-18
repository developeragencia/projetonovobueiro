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

interface PaymentConfigData {
  apiKey: string;
  merchantId: string;
  secretKey: string;
}

interface PaymentConfigProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  onSave: (config: PaymentConfigData) => Promise<void>;
}

export const PaymentConfig: React.FC<PaymentConfigProps> = ({
  open,
  onClose,
  platform,
  onSave
}) => {
  const [config, setConfig] = useState<PaymentConfigData>({
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