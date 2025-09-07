import React from 'react';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

const StatsCards = ({ kpis }) => {
  const cards = [
    {
      title: 'Total Sales',
      value: `$${kpis.totalSales.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-500'
    },
    {
      title: 'Active Students',
      value: kpis.activeCustomers.toLocaleString(),
      change: '+8.2%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500'
    },
    {
      title: 'Daily Revenue',
      value: `$${kpis.dailyRevenue.toLocaleString()}`,
      change: '+15.3%',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <span className="text-green-400 text-sm font-medium">{card.change}</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">{card.title}</p>
              <p className="text-white text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;