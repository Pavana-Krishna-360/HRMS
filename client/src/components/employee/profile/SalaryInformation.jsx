import React from 'react';

const SalaryInformation = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Salary Structure</h3>
          <p className="text-sm text-slate-500 mt-1">Salary information is managed by HR.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-slate-600">Basic Salary</span>
            <span className="text-sm font-semibold text-slate-900">{data.basicSalary}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-slate-600">Allowances</span>
            <span className="text-sm font-semibold text-slate-900">{data.allowances}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-slate-600">Deductions</span>
            <span className="text-sm font-semibold text-red-600">-{data.deductions}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
          <span className="text-base font-bold text-slate-900">Net Salary</span>
          <span className="text-xl font-bold text-primary-700">{data.netSalary}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryInformation;
