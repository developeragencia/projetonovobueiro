import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Paper,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Typography
} from '@mui/material';

interface PreferencesFormProps {
  onSave: (preferences: any) => void;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSave }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('pt-BR');
  const [timezone, setTimezone] = useState('America/Sao_Paulo');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      emailNotifications,
      pushNotifications,
      theme,
      language,
      timezone
    });
    setShowSnackbar(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Preferências do Sistema
      </Typography>

      <FormGroup sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          }
          label="Notificações por E-mail"
        />
        <FormControlLabel
          control={
            <Switch
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
          }
          label="Notificações Push"
        />
      </FormGroup>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tema</InputLabel>
        <Select
          value={theme}
          label="Tema"
          onChange={(e) => setTheme(e.target.value)}
        >
          <MenuItem value="light">Claro</MenuItem>
          <MenuItem value="dark">Escuro</MenuItem>
          <MenuItem value="system">Sistema</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Idioma</InputLabel>
        <Select
          value={language}
          label="Idioma"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
          <MenuItem value="en-US">English (US)</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Fuso Horário</InputLabel>
        <Select
          value={timezone}
          label="Fuso Horário"
          onChange={(e) => setTimezone(e.target.value)}
        >
          <MenuItem value="America/Sao_Paulo">São Paulo (GMT-3)</MenuItem>
          <MenuItem value="America/New_York">New York (GMT-4)</MenuItem>
          <MenuItem value="Europe/London">London (GMT+1)</MenuItem>
          <MenuItem value="Europe/Paris">Paris (GMT+2)</MenuItem>
          <MenuItem value="Asia/Tokyo">Tokyo (GMT+9)</MenuItem>
          <MenuItem value="Australia/Sydney">Sydney (GMT+10)</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Salvar Preferências
        </Button>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Preferências salvas com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PreferencesForm; 