import React from 'react';
import Button from '../../common/Button';
import { calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const ProcessPayrollDialog = ({ isOpen, onClose, onProcess, record }) => {
  if (!isOpen || !record) return null;

  const gross = calculateGross(record);
  const deductions = calculateDeductions(record);
  const net = calculateNet(record);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Process Payroll</h3>
        <p className="text-slate-500 text-sm mb-6">Process payroll for <span className="font-bold text-slate-700">{record.employeeName}</span>?</p>
        
        <div className="bg-slate-50 rounded-lg border border-slate-100 p-4 mb-6 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-600 font-medium">Gross Salary</span><span className="font-bold text-slate-900">{formatCurrency(gross)}</span></div>
          <div className="flex justify-between"><span className="text-slate-600 font-medium">Deductions</span><span className="font-bold text-rose-600">{formatCurrency(deductions)}</span></div>
          <div className="flex justify-between pt-2 border-t border-slate-200"><span className="text-emerald-800 font-bold">Net Salary</span><span className="font-extrabold text-emerald-700">{formatCurrency(net)}</span></div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="w-auto">Cancel</Button>
          <Button onClick={() => onProcess(record.id)} className="w-auto bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white">Process Payroll</Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessPayrollDialog;
