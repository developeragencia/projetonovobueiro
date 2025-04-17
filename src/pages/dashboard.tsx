import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Info, TrendingUp, TrendingDown } from '@mui/icons-material';

const data = [
  { name: '01/01', roas: 2.5, cpa: 45, ctr: 2.1 },
  { name: '02/01', roas: 2.8, cpa: 42, ctr: 2.3 },
  { name: '03/01', roas: 2.3, cpa: 48, ctr: 2.0 },
  { name: '04/01', roas: 3.0, cpa: 40, ctr: 2.5 },
  { name: '05/01', roas: 2.9, cpa: 41, ctr: 2.4 },
  { name: '06/01', roas: 3.2, cpa: 38, ctr: 2.7 },
  { name: '07/01', roas: 3.5, cpa: 35, ctr: 2.9 }
];

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  info: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, info }) => {
  const isPositive = trend > 0;
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Tooltip title={info}>
            <IconButton size="small">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          {isPositive ? (
            <TrendingUp color="success" fontSize="small" />
          ) : (
            <TrendingDown color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
          >
            {Math.abs(trend)}% vs mês anterior
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Métricas Principais */}
          <Grid item xs={12} md={4}>
            <MetricCard
              title="ROAS Médio"
              value="2.8x"
              trend={12}
              info="Retorno sobre o investimento em publicidade"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="CPA Médio"
              value="R$ 42,00"
              trend={-5}
              info="Custo por aquisição de cliente"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="CTR Médio"
              value="2.4%"
              trend={8}
              info="Taxa de cliques nos anúncios"
            />
          </Grid>

          {/* Gráfico de Performance */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  Performance ao Longo do Tempo
                </Typography>
                <Tooltip title="Dados dos últimos 7 dias">
                  <IconButton size="small">
                    <Info />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis 
                      dataKey="name"
                      stroke={theme.palette.text.secondary}
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke={theme.palette.primary.main}
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      stroke={theme.palette.secondary.main}
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="roas"
                      stroke={theme.palette.primary.main}
                      name="ROAS"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cpa"
                      stroke={theme.palette.secondary.main}
                      name="CPA"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="ctr"
                      stroke={theme.palette.success.main}
                      name="CTR"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 