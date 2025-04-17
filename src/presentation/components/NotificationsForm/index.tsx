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
  Grid
} from '@mui/material';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  slack: boolean;
  budgetAlerts: boolean;
  performanceAlerts: boolean;
  budgetThreshold: number;
  performanceThreshold: number;
  frequency: string;
}

export const NotificationsForm: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    slack: false,
    budgetAlerts: true,
    performanceAlerts: true,
    budgetThreshold: 80,
    performanceThreshold: 20,
    frequency: 'daily'
  });

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
    // TODO: Implementar a lógica de salvar as configurações
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Typography variant="subtitle1" gutterBottom>
        Canais de Notificação
      </Typography>
      
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={settings.email}
              onChange={handleChange}
              name="email"
            />
          }
          label="Email"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.push}
              onChange={handleChange}
              name="push"
            />
          }
          label="Notificações Push"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.slack}
              onChange={handleChange}
              name="slack"
            />
          }
          label="Slack"
        />
      </FormGroup>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Tipos de Alerta
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={settings.budgetAlerts}
              onChange={handleChange}
              name="budgetAlerts"
            />
          }
          label="Alertas de Orçamento"
        />

        <Box sx={{ px: 2, mt: 1 }}>
          <Typography variant="body2" gutterBottom>
            Limite de Orçamento ({settings.budgetThreshold}%)
          </Typography>
          <Slider
            value={settings.budgetThreshold}
            onChange={handleSliderChange('budgetThreshold')}
            disabled={!settings.budgetAlerts}
            aria-labelledby="budget-threshold-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={50}
            max={100}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={settings.performanceAlerts}
              onChange={handleChange}
              name="performanceAlerts"
            />
          }
          label="Alertas de Performance"
        />

        <Box sx={{ px: 2, mt: 1 }}>
          <Typography variant="body2" gutterBottom>
            Limite de Queda de Performance ({settings.performanceThreshold}%)
          </Typography>
          <Slider
            value={settings.performanceThreshold}
            onChange={handleSliderChange('performanceThreshold')}
            disabled={!settings.performanceAlerts}
            aria-labelledby="performance-threshold-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={50}
          />
        </Box>
      </FormGroup>

      <FormControl fullWidth margin="normal">
        <InputLabel>Frequência dos Relatórios</InputLabel>
        <Select
          value={settings.frequency}
          onChange={handleSelectChange}
          name="frequency"
        >
          <MenuItem value="realtime">Tempo Real</MenuItem>
          <MenuItem value="daily">Diário</MenuItem>
          <MenuItem value="weekly">Semanal</MenuItem>
          <MenuItem value="monthly">Mensal</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
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