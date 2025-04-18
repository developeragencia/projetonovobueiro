import { FC } from 'react';
import {
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import MetricsCard from '../MetricsCard';

const DashboardMetrics: FC = () => {
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 24.563,00',
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      percentageChange: 12.5,
      description: 'Comparado ao mês anterior',
      trend: 'up',
      color: 'primary',
    },
    {
      title: 'Novos Clientes',
      value: '245',
      icon: <UsersIcon className="w-6 h-6" />,
      percentageChange: 5.2,
      description: 'Últimos 30 dias',
      trend: 'up',
      color: 'success',
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      icon: <ChartBarIcon className="w-6 h-6" />,
      percentageChange: -0.8,
      description: 'Comparado à semana anterior',
      trend: 'down',
      color: 'warning',
    },
    {
      title: 'Vendas Totais',
      value: '384',
      icon: <ShoppingCartIcon className="w-6 h-6" />,
      percentageChange: 8.3,
      description: 'Últimos 7 dias',
      trend: 'up',
      color: 'success',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metrics.map((metric) => (
        <MetricsCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          percentageChange={metric.percentageChange}
          description={metric.description}
          trend={metric.trend as 'up' | 'down'}
          color={metric.color}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics; 