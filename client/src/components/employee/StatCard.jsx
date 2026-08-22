import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;
