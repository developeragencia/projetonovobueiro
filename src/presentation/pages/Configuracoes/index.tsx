import React, { useState } from 'react';
import {
  Save,
  Business,
  Person,
  Notifications,
  Security,
  Language
} from '@mui/icons-material';

export const Configuracoes: React.FC = () => {
  const [configuracoes, setConfiguracoes] = useState({
    empresa: {
      nome: 'Minha Empresa',
      cnpj: '12.345.678/0001-90',
      email: 'contato@minhaempresa.com',
      telefone: '(11) 99999-9999'
    },
    notificacoes: {
      emailAlertaOrcamento: true,
      emailRelatorios: true,
      telegramAlertas: false,
      whatsappAlertas: true
    },
    objetivos: {
      roasMinimo: 2,
      cpaMaximo: 50,
      alertaOrcamento: 80
    },
    integracao: {
      webhookUrl: 'https://api.minhaempresa.com/webhook',
      apiKey: '123456789',
      timeoutSegundos: 30
    }
  });

  const handleSave = () => {
    // Implementar salvamento das configurações
    console.log('Salvando configurações:', configuracoes);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Configurações</h2>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <Save className="mr-2" />
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Dados da Empresa */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Business className="mr-2 text-gray-500" />
            <h3 className="text-lg font-medium">Dados da Empresa</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Empresa
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.empresa.nome}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    empresa: { ...configuracoes.empresa, nome: e.target.value }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.empresa.cnpj}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    empresa: { ...configuracoes.empresa, cnpj: e.target.value }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.empresa.email}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    empresa: { ...configuracoes.empresa, email: e.target.value }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.empresa.telefone}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    empresa: { ...configuracoes.empresa, telefone: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Notifications className="mr-2 text-gray-500" />
            <h3 className="text-lg font-medium">Notificações</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={configuracoes.notificacoes.emailAlertaOrcamento}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    notificacoes: {
                      ...configuracoes.notificacoes,
                      emailAlertaOrcamento: e.target.checked
                    }
                  })
                }
              />
              <label className="ml-2 text-sm text-gray-700">
                Receber alertas de orçamento por e-mail
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={configuracoes.notificacoes.emailRelatorios}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    notificacoes: {
                      ...configuracoes.notificacoes,
                      emailRelatorios: e.target.checked
                    }
                  })
                }
              />
              <label className="ml-2 text-sm text-gray-700">
                Receber relatórios diários por e-mail
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={configuracoes.notificacoes.telegramAlertas}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    notificacoes: {
                      ...configuracoes.notificacoes,
                      telegramAlertas: e.target.checked
                    }
                  })
                }
              />
              <label className="ml-2 text-sm text-gray-700">
                Receber alertas no Telegram
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={configuracoes.notificacoes.whatsappAlertas}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    notificacoes: {
                      ...configuracoes.notificacoes,
                      whatsappAlertas: e.target.checked
                    }
                  })
                }
              />
              <label className="ml-2 text-sm text-gray-700">
                Receber alertas no WhatsApp
              </label>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Language className="mr-2 text-gray-500" />
            <h3 className="text-lg font-medium">Objetivos</h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ROAS Mínimo
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.objetivos.roasMinimo}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    objetivos: {
                      ...configuracoes.objetivos,
                      roasMinimo: Number(e.target.value)
                    }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPA Máximo
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.objetivos.cpaMaximo}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    objetivos: {
                      ...configuracoes.objetivos,
                      cpaMaximo: Number(e.target.value)
                    }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alerta de Orçamento (%)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.objetivos.alertaOrcamento}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    objetivos: {
                      ...configuracoes.objetivos,
                      alertaOrcamento: Number(e.target.value)
                    }
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Integração */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Security className="mr-2 text-gray-500" />
            <h3 className="text-lg font-medium">Integração</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL do Webhook
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.integracao.webhookUrl}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    integracao: {
                      ...configuracoes.integracao,
                      webhookUrl: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.integracao.apiKey}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    integracao: {
                      ...configuracoes.integracao,
                      apiKey: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (segundos)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={configuracoes.integracao.timeoutSegundos}
                onChange={(e) =>
                  setConfiguracoes({
                    ...configuracoes,
                    integracao: {
                      ...configuracoes.integracao,
                      timeoutSegundos: Number(e.target.value)
                    }
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 