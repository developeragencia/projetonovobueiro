import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import { Integration } from '@/mocks/integrations';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConnect,
  onDisconnect
}) => {
  const { id, name, description, imageUrl, isConnected } = integration;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Chip
            label={isConnected ? 'Conectado' : 'Desconectado'}
            color={isConnected ? 'success' : 'default'}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Button
          variant={isConnected ? 'outlined' : 'contained'}
          color={isConnected ? 'error' : 'primary'}
          fullWidth
          onClick={() => isConnected ? onDisconnect(id) : onConnect(id)}
        >
          {isConnected ? 'Desconectar' : 'Conectar'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard; 