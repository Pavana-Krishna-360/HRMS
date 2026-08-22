import React from 'react';
import { usePayroll, calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const SummaryCard = ({ title, value, colorClass = "text-slate-900" }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const HRPayrollSummary = () => {
  const { payrollRecords } = usePayroll();

  let totalGross = 0;
  let totalDeductions = 0;
  let totalNet = 0;

  payrollRecords.forEach(r => {
    totalGross += calculateGross(r);
    totalDeductions += calculateDeductions(r);
    totalNet += calculateNet(r);
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <SummaryCard title="Total Employees" value="48" />
      <SummaryCard title="Total Gross Payroll" value={formatCurrency(totalGross * 15)} /> 
      <SummaryCard title="Total Deductions" value={formatCurrency(totalDeductions * 15)} colorClass="text-rose-600" />
      <SummaryCard title="Net Payroll" value={formatCurrency(totalNet * 15)} colorClass="text-emerald-600" />
    </div>
  );
};

export default HRPayrollSummary;
