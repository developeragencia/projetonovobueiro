import React, { useState } from 'react';
import {
  Search,
  FilterList,
  Edit,
  Delete,
  Pause,
  PlayArrow
} from '@mui/icons-material';

interface Campanha {
  id: string;
  nome: string;
  plataforma: string;
  status: string;
  orcamentoDiario: number;
  gastoTotal: number;
  conversoes: number;
  cpa: number;
  roas: number;
}

export const ListaCampanhas: React.FC = () => {
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [filtroPlataforma, setFiltroPlataforma] = useState('todas');
  const [busca, setBusca] = useState('');

  const campanhas: Campanha[] = [
    {
      id: '1',
      nome: 'Black Friday - Principais',
      plataforma: 'Facebook Ads',
      status: 'ativa',
      orcamentoDiario: 1000,
      gastoTotal: 1250,
      conversoes: 45,
      cpa: 27.78,
      roas: 3.2
    },
    {
      id: '2',
      nome: 'Remarketing - Carrinho',
      plataforma: 'Google Ads',
      status: 'ativa',
      orcamentoDiario: 500,
      gastoTotal: 850,
      conversoes: 32,
      cpa: 26.56,
      roas: 4.5
    },
    {
      id: '3',
      nome: 'Prospecting - Interesses',
      plataforma: 'TikTok Ads',
      status: 'pausada',
      orcamentoDiario: 1500,
      gastoTotal: 2100,
      conversoes: 58,
      cpa: 36.21,
      roas: 1.8
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Campanhas</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Nova Campanha
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar campanhas..."
                className="w-full pl-10 pr-4 py-2 border rounded"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <select
                className="px-4 py-2 border rounded"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="todas">Todos os Status</option>
                <option value="ativa">Ativas</option>
                <option value="pausada">Pausadas</option>
                <option value="arquivada">Arquivadas</option>
              </select>
            </div>

            <div>
              <select
                className="px-4 py-2 border rounded"
                value={filtroPlataforma}
                onChange={(e) => setFiltroPlataforma(e.target.value)}
              >
                <option value="todas">Todas as Plataformas</option>
                <option value="facebook">Facebook Ads</option>
                <option value="google">Google Ads</option>
                <option value="tiktok">TikTok Ads</option>
              </select>
            </div>

            <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-50">
              <FilterList className="mr-2" />
              Mais Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Campanhas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campanha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plataforma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orçamento/dia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gasto Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversões
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campanhas.map((campanha) => (
              <tr key={campanha.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{campanha.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{campanha.plataforma}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campanha.status === 'ativa'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {campanha.status.charAt(0).toUpperCase() + campanha.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">R$ {campanha.orcamentoDiario.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">R$ {campanha.gastoTotal.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{campanha.conversoes}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">R$ {campanha.cpa.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${
                      campanha.roas >= 2 ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {campanha.roas.toFixed(1)}x
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {campanha.status === 'ativa' ? (
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Pause />
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-900">
                        <PlayArrow />
                      </button>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 