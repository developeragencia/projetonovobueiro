import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Typography,
  Container
} from '@mui/material';
import CampanhaCard from '../CampanhaCard';

interface Campanha {
  id: string;
  nome: string;
  plataforma: string;
  status: 'ativa' | 'pausada' | 'encerrada';
  orcamentoDiario: number;
  metricas: {
    impressoes: number;
    cliques: number;
    conversoes: number;
    cpc: number;
    ctr: number;
  };
}

interface CampanhaListProps {
  campanhas: Campanha[];
  onPauseCampanha: (id: string) => void;
  onActivateCampanha: (id: string) => void;
  onDeleteCampanha: (id: string) => void;
  onEditCampanha: (id: string) => void;
}

const CampanhaList: React.FC<CampanhaListProps> = ({
  campanhas,
  onPauseCampanha,
  onActivateCampanha,
  onDeleteCampanha,
  onEditCampanha,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [plataformaFilter, setPlataformaFilter] = useState<string>('todas');

  const plataformas = Array.from(new Set(campanhas.map(c => c.plataforma)));

  const filteredCampanhas = campanhas.filter(campanha => {
    const matchesSearch = campanha.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || campanha.status === statusFilter;
    const matchesPlataforma = plataformaFilter === 'todas' || campanha.plataforma === plataformaFilter;
    
    return matchesSearch && matchesStatus && matchesPlataforma;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Campanhas
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Buscar campanhas"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="ativa">Ativas</MenuItem>
                <MenuItem value="pausada">Pausadas</MenuItem>
                <MenuItem value="encerrada">Encerradas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Plataforma</InputLabel>
              <Select
                value={plataformaFilter}
                label="Plataforma"
                onChange={(e) => setPlataformaFilter(e.target.value)}
              >
                <MenuItem value="todas">Todas</MenuItem>
                {plataformas.map(plataforma => (
                  <MenuItem key={plataforma} value={plataforma}>
                    {plataforma}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {filteredCampanhas.map(campanha => (
            <Grid item xs={12} sm={6} md={4} key={campanha.id}>
              <CampanhaCard
                campanha={campanha}
                onPause={onPauseCampanha}
                onActivate={onActivateCampanha}
                onDelete={onDeleteCampanha}
                onEdit={onEditCampanha}
              />
            </Grid>
          ))}
          
          {filteredCampanhas.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" align="center">
                Nenhuma campanha encontrada com os filtros selecionados.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CampanhaList; 