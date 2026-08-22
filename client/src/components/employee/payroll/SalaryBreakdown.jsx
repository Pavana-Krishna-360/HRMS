import React from 'react';
import { calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const SalaryRow = ({ label, amount, isTotal = false, isDeduction = false }) => (
  <div className={`flex justify-between items-center py-3 ${isTotal ? 'border-t border-slate-200 mt-2 pt-4' : 'border-b border-slate-50'}`}>
    <span className={`${isTotal ? 'font-bold text-slate-900' : 'text-sm font-medium text-slate-600'}`}>{label}</span>
    <span className={`${isTotal ? 'font-bold text-lg' : 'text-sm font-semibold'} ${isDeduction && !isTotal ? 'text-rose-600' : 'text-slate-900'}`}>
      {isDeduction && !isTotal ? '-' : ''}{formatCurrency(amount)}
    </span>
  </div>
);

const SalaryBreakdown = ({ currentRecord }) => {
  if (!currentRecord) return null;

  const gross = calculateGross(currentRecord);
  const deductions = calculateDeductions(currentRecord);
  const net = calculateNet(currentRecord);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Earnings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-2">Earnings</h3>
        <SalaryRow label="Basic Salary" amount={currentRecord.basicSalary} />
        <SalaryRow label="House Rent Allowance" amount={currentRecord.hra} />
        <SalaryRow label="Special Allowance" amount={currentRecord.specialAllowance} />
        <SalaryRow label="Other Allowance" amount={currentRecord.otherAllowance} />
        <SalaryRow label="Gross Salary" amount={gross} isTotal={true} />
      </div>

      {/* Deductions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-2">Deductions</h3>
        <div className="flex-1">
          <SalaryRow label="Provident Fund" amount={currentRecord.pf} isDeduction={true} />
          <SalaryRow label="Professional Tax" amount={currentRecord.professionalTax} isDeduction={true} />
          <SalaryRow label="Other Deductions" amount={currentRecord.otherDeductions} isDeduction={true} />
        </div>
        <SalaryRow label="Total Deductions" amount={deductions} isTotal={true} isDeduction={true}/>
      </div>

      {/* Net Salary (Spans full width on desktop) */}
      <div className="md:col-span-2 bg-emerald-50 rounded-xl border border-emerald-200 p-6 flex justify-between items-center shadow-sm">
        <span className="text-xl font-bold text-emerald-900 uppercase tracking-wide">Net Salary</span>
        <span className="text-3xl font-extrabold text-emerald-700">{formatCurrency(net)}</span>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
