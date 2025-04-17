import React, { useState } from 'react';
import {
  Add,
  PlayArrow,
  Pause,
  Delete,
  Edit,
  Timeline
} from '@mui/icons-material';

interface Regra {
  id: string;
  nome: string;
  condicoes: string[];
  acoes: string[];
  status: string;
  ultimaExecucao: string;
  proximaExecucao: string;
}

export const RegrasAutomaticas: React.FC = () => {
  const [regras] = useState<Regra[]>([
    {
      id: '1',
      nome: 'Pausar Campanhas com CPA Alto',
      condicoes: [
        'CPA > R$ 50,00',
        'Gasto > R$ 100,00',
        'Últimas 24 horas'
      ],
      acoes: [
        'Pausar campanha',
        'Enviar notificação'
      ],
      status: 'ativa',
      ultimaExecucao: '2024-03-10 15:30',
      proximaExecucao: '2024-03-11 15:30'
    },
    {
      id: '2',
      nome: 'Aumentar Orçamento Campanhas Lucrativas',
      condicoes: [
        'ROAS > 3',
        'Conversões > 10',
        'Últimas 48 horas'
      ],
      acoes: [
        'Aumentar orçamento em 20%',
        'Enviar notificação'
      ],
      status: 'ativa',
      ultimaExecucao: '2024-03-10 14:00',
      proximaExecucao: '2024-03-12 14:00'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Regras Automáticas</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <Add className="mr-2" />
          Nova Regra
        </button>
      </div>

      {/* Cards de Regras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regras.map((regra) => (
          <div key={regra.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{regra.nome}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    regra.status === 'ativa'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {regra.status.charAt(0).toUpperCase() + regra.status.slice(1)}
                </span>
              </div>
              <div className="flex space-x-2">
                {regra.status === 'ativa' ? (
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
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Condições</h4>
                <ul className="space-y-1">
                  {regra.condicoes.map((condicao, index) => (
                    <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                      {condicao}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Ações</h4>
                <ul className="space-y-1">
                  {regra.acoes.map((acao, index) => (
                    <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                      {acao}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Timeline className="mr-2" />
                  <div>
                    <p>Última execução: {new Date(regra.ultimaExecucao).toLocaleString()}</p>
                    <p>Próxima execução: {new Date(regra.proximaExecucao).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Nova Regra (pode ser implementado posteriormente) */}
    </div>
  );
}; 