import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Tooltip,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon
} from '@mui/icons-material';

interface Metricas {
  cpc?: number;
  ctr?: number;
  conversoes?: number;
  gastos?: number;
  impressoes?: number;
  roas?: number;
}

interface CampanhaCardProps {
  id: string;
  nome: string;
  status: string;
  plataforma: string;
  metricas: Metricas;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, novoStatus: string) => void;
}

const CampanhaCard: React.FC<CampanhaCardProps> = ({
  id,
  nome,
  status,
  plataforma,
  metricas,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarNumero = (numero: number): string => {
    return new Intl.NumberFormat('pt-BR').format(numero);
  };

  const formatarPorcentagem = (valor: number): string => {
    return `${(valor * 100).toFixed(2)}%`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            {nome}
          </Typography>
          <Chip
            label={status}
            color={status === 'ativo' ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Typography color="textSecondary" gutterBottom>
          Plataforma: {plataforma}
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              CPC
            </Typography>
            <Typography variant="body1">{formatarValor(metricas.cpc || 0)}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              CTR
            </Typography>
            <Typography variant="body1">{formatarPorcentagem(metricas.ctr || 0)}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Conversões
            </Typography>
            <Typography variant="body1">{formatarNumero(metricas.conversoes || 0)}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Gastos
            </Typography>
            <Typography variant="body1">{formatarValor(metricas.gastos || 0)}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Impressões
            </Typography>
            <Typography variant="body1">{formatarNumero(metricas.impressoes || 0)}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body2" color="textSecondary">
              ROAS
            </Typography>
            <Typography variant="body1">{metricas.roas?.toFixed(2) || '0.00'}x</Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          {status === 'ativo' ? (
            <Tooltip title="Pausar campanha">
              <IconButton onClick={() => onToggleStatus(id, 'pausado')} size="small">
                <PauseIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Ativar campanha">
              <IconButton onClick={() => onToggleStatus(id, 'ativo')} size="small">
                <PlayIcon />
              </IconButton>
            </Tooltip>
          )}

          <Box ml={1}>
            <Tooltip title="Editar campanha">
              <IconButton onClick={() => onEdit(id)} size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir campanha">
              <IconButton onClick={() => onDelete(id)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampanhaCard; 