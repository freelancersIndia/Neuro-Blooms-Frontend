import React from 'react';
import { Users, UserCheck, Sparkles, Activity } from 'lucide-react';
import StatisticCard from './StatisticCard';

export const PatientStatistics = ({ stats }) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Patients',
      value: stats.totalPatients || 0,
      subLabel: 'All time',
      icon: Users,
      iconColorClass: 'text-purple-650',
      iconBgClass: 'bg-purple-50 border border-purple-100/30'
    },
    {
      id: 'active',
      label: 'Active Patients',
      value: stats.activePatients || 0,
      subLabel: `${((stats.activePatients / (stats.totalPatients || 1)) * 100).toFixed(1)}% of total`,
      icon: UserCheck,
      iconColorClass: 'text-emerald-650',
      iconBgClass: 'bg-emerald-50 border border-emerald-100/30'
    },
    {
      id: 'new',
      label: 'New This Month',
      value: stats.newThisMonth || 0,
      subLabel: '+12% from last month',
      icon: Sparkles,
      iconColorClass: 'text-amber-650',
      iconBgClass: 'bg-amber-50 border border-amber-100/30'
    },
    {
      id: 'treatment',
      label: 'Under Treatment',
      value: stats.underTreatment || 0,
      subLabel: `${((stats.underTreatment / (stats.totalPatients || 1)) * 100).toFixed(1)}% of total`,
      icon: Activity,
      iconColorClass: 'text-blue-650',
      iconBgClass: 'bg-blue-50 border border-blue-100/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {cards.map((card) => (
        <StatisticCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default PatientStatistics;
