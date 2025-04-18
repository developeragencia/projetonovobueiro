import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle as ConnectedIcon,
  Cancel as DisconnectedIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

interface IntegrationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  status: 'connected' | 'disconnected';
  onConnect: () => void;
  onDisconnect: () => void;
  onConfigure: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  imageUrl,
  status,
  onConnect,
  onDisconnect,
  onConfigure
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{
              width: 48,
              height: 48,
              objectFit: 'contain',
              mr: 2
            }}
          />
          <Box flex={1}>
            <Typography variant="h6" component="h3">
              {name}
            </Typography>
            <Chip
              icon={status === 'connected' ? <ConnectedIcon /> : <DisconnectedIcon />}
              label={status === 'connected' ? 'Conectado' : 'Desconectado'}
              color={status === 'connected' ? 'success' : 'default'}
              size="small"
            />
          </Box>
        </Box>

        <Typography color="textSecondary" variant="body2" mb={2}>
          {description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          {status === 'connected' ? (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onDisconnect}
            >
              Desconectar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onConnect}
            >
              Conectar
            </Button>
          )}

          {status === 'connected' && (
            <Tooltip title="Configurações">
              <IconButton size="small" onClick={onConfigure}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard; 