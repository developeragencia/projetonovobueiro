import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import NotificationsForm from '../../components/NotificationsForm';
import PreferencesForm from '../../components/PreferencesForm';
import UTMConfiguration from '../../components/UTMConfiguration';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: string;
  customMessage: string;
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSaveNotifications = (settings: NotificationSettings) => {
    console.log('Salvando configurações de notificações:', settings);
    // Implementar lógica de salvamento
  };

  const handleSavePreferences = (preferences: PreferencesSettings) => {
    console.log('Salvando preferências:', preferences);
    // Implementar lógica de salvamento
  };

  const handleSaveUTM = (config: UTMSettings) => {
    console.log('Salvando configurações de UTM:', config);
    // Implementar lógica de salvamento
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
            onChange={handleChange}
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
    </Container>
  );
} 