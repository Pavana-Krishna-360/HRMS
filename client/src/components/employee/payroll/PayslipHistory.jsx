import React, { useState } from 'react';
import { usePayroll, calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';
import PayslipDetails from './PayslipDetails';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const PayslipHistory = () => {
  const { payrollRecords } = usePayroll();
  // Filter for employee's own records
  const myRecords = payrollRecords.filter(r => r.employeeId === "EMP001");
  
  const [selectedRecord, setSelectedRecord] = useState(null);

  const getStatusBadge = (status) => {
    if (status === 'Processed') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800">Payslip History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-white">
              <th className="py-4 px-6 font-medium">Month</th>
              <th className="py-4 px-6 font-medium">Gross Salary</th>
              <th className="py-4 px-6 font-medium">Deductions</th>
              <th className="py-4 px-6 font-medium">Net Salary</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {myRecords.map((record) => {
              const gross = calculateGross(record);
              const ded = calculateDeductions(record);
              const net = calculateNet(record);
              return (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{record.month}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{formatCurrency(gross)}</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">{formatCurrency(ded)}</td>
                  <td className="py-4 px-6 text-emerald-600 font-bold">{formatCurrency(net)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border inline-block ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelectedRecord(record)}
                      className="px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 transition-colors focus:outline-none"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PayslipDetails 
        isOpen={!!selectedRecord} 
        record={selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
      />
    </div>
  );
};

export default PayslipHistory;
