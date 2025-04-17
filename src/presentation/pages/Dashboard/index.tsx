import React from 'react';
import {
  Container,
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
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: '01/01', roas: 2.5, cpa: 45, ctr: 2.1 },
  { name: '02/01', roas: 2.8, cpa: 42, ctr: 2.3 },
  { name: '03/01', roas: 2.3, cpa: 48, ctr: 2.0 },
  { name: '04/01', roas: 3.0, cpa: 40, ctr: 2.5 },
  { name: '05/01', roas: 2.9, cpa: 41, ctr: 2.4 },
  { name: '06/01', roas: 3.2, cpa: 38, ctr: 2.7 },
  { name: '07/01', roas: 3.5, cpa: 35, ctr: 2.9 }
];

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Métricas Principais */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ROAS Médio
                </Typography>
                <Typography variant="h4">2.8x</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  CPA Médio
                </Typography>
                <Typography variant="h4">R$ 42,00</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  CTR Médio
                </Typography>
                <Typography variant="h4">2.4%</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfico de Performance */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance ao Longo do Tempo
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="roas"
                      stroke="#8884d8"
                      name="ROAS"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cpa"
                      stroke="#82ca9d"
                      name="CPA"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="ctr"
                      stroke="#ffc658"
                      name="CTR"
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