import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';

interface Metricas {
  impressoes: number;
  cliques: number;
  conversoes: number;
  cpc: number;
  ctr: number;
}

interface Campanha {
  id: string;
  nome: string;
  plataforma: string;
  status: 'ativa' | 'pausada' | 'encerrada';
  orcamentoDiario: number;
  metricas: Metricas;
}

interface CampanhaCardProps {
  campanha: Campanha;
  onPause: (id: string) => void;
  onActivate: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const formatarNumero = (numero: number): string => {
  return new Intl.NumberFormat('pt-BR').format(numero);
};

const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

const formatarPorcentagem = (valor: number): string => {
  return `${(valor * 100).toFixed(2)}%`;
};

const CampanhaCard: React.FC<CampanhaCardProps> = ({
  campanha,
  onPause,
  onActivate,
  onDelete,
  onEdit,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'success';
      case 'pausada':
        return 'warning';
      case 'encerrada':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            {campanha.nome}
          </Typography>
          <Chip
            label={campanha.status.charAt(0).toUpperCase() + campanha.status.slice(1)}
            color={getStatusColor(campanha.status) as any}
            size="small"
          />
        </Box>

        <Typography color="textSecondary" gutterBottom>
          {campanha.plataforma}
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Orçamento Diário: {formatarMoeda(campanha.orcamentoDiario)}
        </Typography>

        <Box my={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="caption" display="block">Impressões</Typography>
              <Typography variant="body2">{formatarNumero(campanha.metricas.impressoes)}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" display="block">Cliques</Typography>
              <Typography variant="body2">{formatarNumero(campanha.metricas.cliques)}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" display="block">Conversões</Typography>
              <Typography variant="body2">{formatarNumero(campanha.metricas.conversoes)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">CPC</Typography>
              <Typography variant="body2">{formatarMoeda(campanha.metricas.cpc)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">CTR</Typography>
              <Typography variant="body2">{formatarPorcentagem(campanha.metricas.ctr)}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box>
            {campanha.status !== 'encerrada' && (
              campanha.status === 'ativa' ? (
                <Tooltip title="Pausar campanha">
                  <IconButton onClick={() => onPause(campanha.id)} size="small">
                    <PauseIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Ativar campanha">
                  <IconButton onClick={() => onActivate(campanha.id)} size="small">
                    <PlayIcon />
                  </IconButton>
                </Tooltip>
              )
            )}
          </Box>
          <Box>
            <Tooltip title="Editar campanha">
              <IconButton onClick={() => onEdit(campanha.id)} size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir campanha">
              <IconButton onClick={() => onDelete(campanha.id)} size="small">
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