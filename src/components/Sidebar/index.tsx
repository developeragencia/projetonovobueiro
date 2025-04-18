import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  AutoFixHigh as RulesIcon,
  Assessment as MetricsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Campanhas', icon: <CampaignIcon />, path: '/campaigns' },
  { text: 'Regras Automáticas', icon: <RulesIcon />, path: '/rules' },
  { text: 'Métricas', icon: <MetricsIcon />, path: '/metrics' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
];

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                borderRadius: '8px',
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path
                    ? theme.palette.primary.main
                    : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: location.pathname === item.path
                    ? theme.palette.primary.main
                    : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
} 