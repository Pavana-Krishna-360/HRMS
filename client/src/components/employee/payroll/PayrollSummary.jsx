import React from 'react';
import { calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const SummaryCard = ({ title, value, colorClass = "text-slate-900" }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const PayrollSummary = ({ currentRecord }) => {
  if (!currentRecord) return null;

  const gross = calculateGross(currentRecord);
  const deductions = calculateDeductions(currentRecord);
  const net = calculateNet(currentRecord);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <SummaryCard title="Gross Salary" value={formatCurrency(gross)} />
      <SummaryCard title="Deductions" value={formatCurrency(deductions)} colorClass="text-rose-600" />
      <SummaryCard title="Net Salary" value={formatCurrency(net)} colorClass="text-emerald-600" />
      <SummaryCard title="Pay Frequency" value="Monthly" />
    </div>
  );
};

export default PayrollSummary;
