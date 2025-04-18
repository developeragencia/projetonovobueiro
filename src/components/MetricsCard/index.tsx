import React, { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentageChange: number;
  description: string;
  trend: 'up' | 'down';
  color: 'primary' | 'success' | 'warning' | 'error';
}

const colorVariants = {
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  error: 'bg-error-50 text-error-700',
};

const MetricsCard: FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  percentageChange,
  description,
  trend,
  color = 'primary',
}) => {
  const isPositive = trend === 'up';
  const trendColor = isPositive ? 'text-success-600' : 'text-error-600';
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorVariants[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="font-medium">{Math.abs(percentageChange)}%</span>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
        {title}
      </h3>

      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default MetricsCard; 