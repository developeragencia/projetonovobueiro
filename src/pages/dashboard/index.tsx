import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Layout from '../../components/Layout';
import AuthCheck from '../../components/AuthCheck';

const data = [
  { name: 'Jan', impressoes: 4000, cliques: 2400, conversoes: 400 },
  { name: 'Fev', impressoes: 3000, cliques: 1398, conversoes: 210 },
  { name: 'Mar', impressoes: 2000, cliques: 9800, conversoes: 290 },
  { name: 'Abr', impressoes: 2780, cliques: 3908, conversoes: 500 },
  { name: 'Mai', impressoes: 1890, cliques: 4800, conversoes: 380 },
  { name: 'Jun', impressoes: 2390, cliques: 3800, conversoes: 420 },
];

const metricas = [
  {
    titulo: 'Impressões',
    valor: '23.4K',
    crescimento: '+5.3%',
    positivo: true,
  },
  {
    titulo: 'Cliques',
    valor: '12.8K',
    crescimento: '+2.7%',
    positivo: true,
  },
  {
    titulo: 'Conversões',
    valor: '2.4K',
    crescimento: '-1.2%',
    positivo: false,
  },
  {
    titulo: 'CPC Médio',
    valor: 'R$ 1.23',
    crescimento: '+0.8%',
    positivo: true,
  },
];

export default function Dashboard() {
  return (
    <AuthCheck>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            {metricas.map((metrica) => (
              <Grid item xs={12} sm={6} md={3} key={metrica.titulo}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {metrica.titulo}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {metrica.valor}
                    </Typography>
                    <Typography
                      sx={{
                        color: metrica.positivo ? 'success.main' : 'error.main',
                      }}
                    >
                      {metrica.crescimento}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Desempenho das Campanhas
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="impressoes"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="cliques" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="conversoes" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </AuthCheck>
  );
} 