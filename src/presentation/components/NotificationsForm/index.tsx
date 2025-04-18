import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Snackbar,
  Alert,
  Typography,
  Slider,
  Grid,
  Paper
} from '@mui/material';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: string;
  customMessage: string;
}

interface NotificationsFormProps {
  onSave: (settings: NotificationSettings) => Promise<void>;
}

export const NotificationsForm: React.FC<NotificationsFormProps> = ({ onSave }) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: 'daily',
    customMessage: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(settings);
    setSnackbar({
      open: true,
      message: 'Configurações de notificação salvas com sucesso!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Configurações de Notificações
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Canais de Notificação
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={handleChange}
              name="emailNotifications"
            />
          }
          label="Notificações por E-mail"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.pushNotifications}
              onChange={handleChange}
              name="pushNotifications"
            />
          }
          label="Notificações Push"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Frequência dos Relatórios
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Frequência dos Relatórios</InputLabel>
          <Select
            value={settings.notificationFrequency}
            onChange={handleSelectChange}
            name="notificationFrequency"
          >
            <MenuItem value="realtime">Tempo Real</MenuItem>
            <MenuItem value="daily">Diário</MenuItem>
            <MenuItem value="weekly">Semanal</MenuItem>
            <MenuItem value="monthly">Mensal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Salvar Configurações
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationsForm; 