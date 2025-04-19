import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Snackbar
} from '@mui/material';

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: string;
  customMessage: string;
}

interface NotificationsFormProps {
  onSave: (settings: NotificationSettings) => Promise<void>;
}

export const NotificationsForm: React.FC<NotificationsFormProps> = ({ onSave }) => {
  const [settings, setSettings] = React.useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    notificationFrequency: 'daily',
    customMessage: ''
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSave(settings);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao salvar notificações';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notificações
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={settings.emailNotifications}
            onChange={handleChange}
            name="emailNotifications"
            color="primary"
          />
        }
        label="Notificações por Email"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.pushNotifications}
            onChange={handleChange}
            name="pushNotifications"
            color="primary"
          />
        }
        label="Notificações Push"
      />
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Notificações'}
        </Button>
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 