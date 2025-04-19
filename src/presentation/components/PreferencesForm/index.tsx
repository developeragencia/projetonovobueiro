import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

interface PreferencesFormProps {
  onSave: (preferences: PreferencesData) => Promise<void>;
}

interface PreferencesData {
  darkMode: boolean;
  notifications: boolean;
  emailUpdates: boolean;
  language: string;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSave }) => {
  const [preferences, setPreferences] = React.useState<PreferencesData>({
    darkMode: false,
    notifications: true,
    emailUpdates: true,
    language: 'pt-BR'
  });
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      await onSave(preferences);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao salvar preferências';
      setError(errorMessage);
      console.error('Erro ao salvar preferências:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Preferências
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={preferences.darkMode}
              onChange={handleChange}
              name="darkMode"
            />
          }
          label="Modo Escuro"
        />
        <FormControlLabel
          control={
            <Switch
              checked={preferences.notifications}
              onChange={handleChange}
              name="notifications"
            />
          }
          label="Notificações"
        />
        <FormControlLabel
          control={
            <Switch
              checked={preferences.emailUpdates}
              onChange={handleChange}
              name="emailUpdates"
            />
          }
          label="Atualizações por Email"
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Salvar Preferências
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

export default PreferencesForm; 