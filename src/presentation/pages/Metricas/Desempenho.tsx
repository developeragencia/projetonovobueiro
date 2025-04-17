import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DateRange } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dadosDesempenho = [
  { data: '01/03', roas: 2.5, cpa: 45, ctr: 2.1, gastos: 1200 },
  { data: '02/03', roas: 2.8, cpa: 42, ctr: 2.3, gastos: 1500 },
  { data: '03/03', roas: 2.3, cpa: 48, ctr: 2.0, gastos: 1100 },
  { data: '04/03', roas: 3.0, cpa: 40, ctr: 2.5, gastos: 1800 },
  { data: '05/03', roas: 2.9, cpa: 41, ctr: 2.4, gastos: 1600 }
];

const dadosPlataforma = [
  { nome: 'Facebook Ads', valor: 45 },
  { nome: 'Google Ads', valor: 30 },
  { nome: 'TikTok Ads', valor: 25 }
];

export const Desempenho: React.FC = () => {
  const [periodo, setPeriodo] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Métricas de Desempenho</h2>
        
        <div className="flex items-center space-x-4">
          <select
            className="px-4 py-2 border rounded"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="15d">Últimos 15 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="custom">Personalizado</option>
          </select>

          <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-50">
            <DateRange className="mr-2" />
            Selecionar Período
          </button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Investimento Total</h3>
          <p className="text-2xl font-bold">R$ 7.200,00</p>
          <p className="text-sm text-green-500">+12% vs período anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Faturamento</h3>
          <p className="text-2xl font-bold">R$ 18.720,00</p>
          <p className="text-sm text-green-500">+15% vs período anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">ROAS Médio</h3>
          <p className="text-2xl font-bold">2.6x</p>
          <p className="text-sm text-green-500">+8% vs período anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Conversões</h3>
          <p className="text-2xl font-bold">312</p>
          <p className="text-sm text-green-500">+10% vs período anterior</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Linha - ROAS e CPA */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">ROAS e CPA ao Longo do Tempo</h3>
          <LineChart width={600} height={300} data={dadosDesempenho}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="roas"
              stroke="#3B82F6"
              name="ROAS"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cpa"
              stroke="#EF4444"
              name="CPA"
            />
          </LineChart>
        </div>

        {/* Gráfico de Pizza - Distribuição por Plataforma */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Investimento por Plataforma</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={dadosPlataforma}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="valor"
            >
              {dadosPlataforma.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Gráfico de Barras - Gastos Diários */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Gastos Diários</h3>
          <BarChart width={600} height={300} data={dadosDesempenho}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gastos" fill="#4F46E5" name="Gastos (R$)" />
          </BarChart>
        </div>

        {/* Gráfico de Linha - CTR */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Taxa de Cliques (CTR)</h3>
          <LineChart width={600} height={300} data={dadosDesempenho}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ctr"
              stroke="#8B5CF6"
              name="CTR (%)"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}; 