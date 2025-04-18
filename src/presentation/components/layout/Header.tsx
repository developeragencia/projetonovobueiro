import React, { useState } from 'react';
import { 
  NotificationsOutlined, 
  AccountCircle,
  Settings,
  ExitToApp 
} from '@mui/icons-material';

export const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">Marketing Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <NotificationsOutlined />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Notificações</h3>
                  <ul className="space-y-3">
                    <li className="p-2 hover:bg-gray-50 rounded">
                      <p className="text-sm">Campanha &quot;Black Friday&quot; atingiu o orçamento diário</p>
                      <span className="text-xs text-gray-500">Há 5 minutos</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded">
                      <p className="text-sm">Nova regra automática aplicada com sucesso</p>
                      <span className="text-xs text-gray-500">Há 1 hora</span>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded">
                      <p className="text-sm">Atualização do Facebook Ads disponível</p>
                      <span className="text-xs text-gray-500">Há 2 horas</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <AccountCircle />
              <span className="text-sm">João Silva</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <a href="/perfil" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <AccountCircle className="mr-2" />
                      <span>Meu Perfil</span>
                    </a>
                  </li>
                  <li>
                    <a href="/configuracoes" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Settings className="mr-2" />
                      <span>Configurações</span>
                    </a>
                  </li>
                  <li className="border-t">
                    <a href="/logout" className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600">
                      <ExitToApp className="mr-2" />
                      <span>Sair</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 