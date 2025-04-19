import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import { NotificationsForm, NotificationSettings } from '../../components/NotificationsForm';
import PreferencesForm from '../../components/PreferencesForm';
import UTMConfiguration from '../../components/UTMConfiguration';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PreferencesSettings {
  darkMode: boolean;
  notifications: boolean;
  emailUpdates: boolean;
  language: string;
}

interface UTMSettings {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  baseUrl: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function Configuracoes() {
  const [value, setValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSaveNotifications = async (settings: NotificationSettings): Promise<void> => {
    try {
      console.log('Salvando configurações de notificações:', settings);
      // Implementar lógica de salvamento
      await Promise.resolve(); // Simulando uma operação assíncrona
      setSnackbar({
        open: true,
        message: 'Notificações salvas com sucesso',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao salvar notificações',
        severity: 'error'
      });
      throw error;
    }
  };

  const handleSavePreferences = async (preferences: PreferencesSettings): Promise<void> => {
    try {
      console.log('Salvando preferências:', preferences);
      // Implementar lógica de salvamento
      await Promise.resolve(); // Simulando uma operação assíncrona
      setSnackbar({
        open: true,
        message: 'Preferências salvas com sucesso',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao salvar preferências',
        severity: 'error'
      });
      throw error;
    }
  };

  const handleSaveUTM = async (config: UTMSettings): Promise<void> => {
    try {
      console.log('Salvando configurações de UTM:', config);
      // Implementar lógica de salvamento
      await Promise.resolve(); // Simulando uma operação assíncrona
      setSnackbar({
        open: true,
        message: 'Configurações UTM salvas com sucesso',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao salvar configurações UTM:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao salvar configurações UTM',
        severity: 'error'
      });
      throw error;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Settings sx={{ mr: 2 }} />
        <Typography variant="h4" component="h1">
          Configurações
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="configurações tabs"
            variant="fullWidth"
          >
            <Tab label="Notificações" {...a11yProps(0)} />
            <Tab label="Preferências" {...a11yProps(1)} />
            <Tab label="Configuração UTM" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <NotificationsForm onSave={handleSaveNotifications} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PreferencesForm onSave={handleSavePreferences} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UTMConfiguration onSave={handleSaveUTM} />
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
} 