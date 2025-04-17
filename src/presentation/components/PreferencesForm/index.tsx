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
  Typography
} from '@mui/material';

interface Preferences {
  darkMode: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  defaultCurrency: string;
  defaultDateRange: string;
}

export const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 5,
    defaultCurrency: 'BRL',
    defaultDateRange: 'last7days'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implementar a lógica de salvar as preferências
    setSnackbar({
      open: true,
      message: 'Preferências salvas com sucesso!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <FormGroup>
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
              checked={preferences.autoRefresh}
              onChange={handleChange}
              name="autoRefresh"
            />
          }
          label="Atualização Automática"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Intervalo de Atualização</InputLabel>
          <Select
            value={preferences.refreshInterval}
            onChange={handleSelectChange}
            name="refreshInterval"
            disabled={!preferences.autoRefresh}
          >
            <MenuItem value={1}>1 minuto</MenuItem>
            <MenuItem value={5}>5 minutos</MenuItem>
            <MenuItem value={15}>15 minutos</MenuItem>
            <MenuItem value={30}>30 minutos</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Moeda Padrão</InputLabel>
          <Select
            value={preferences.defaultCurrency}
            onChange={handleSelectChange}
            name="defaultCurrency"
          >
            <MenuItem value="BRL">Real (BRL)</MenuItem>
            <MenuItem value="USD">Dólar (USD)</MenuItem>
            <MenuItem value="EUR">Euro (EUR)</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Período Padrão</InputLabel>
          <Select
            value={preferences.defaultDateRange}
            onChange={handleSelectChange}
            name="defaultDateRange"
          >
            <MenuItem value="today">Hoje</MenuItem>
            <MenuItem value="yesterday">Ontem</MenuItem>
            <MenuItem value="last7days">Últimos 7 dias</MenuItem>
            <MenuItem value="last30days">Últimos 30 dias</MenuItem>
            <MenuItem value="thisMonth">Este mês</MenuItem>
            <MenuItem value="lastMonth">Mês passado</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Salvar Preferências
          </Button>
        </Box>
      </FormGroup>

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