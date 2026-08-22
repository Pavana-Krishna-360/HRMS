import React, { useState } from 'react';
import { usePayroll, calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';
import PayslipDetails from '../../employee/payroll/PayslipDetails';
import EditPayrollModal from './EditPayrollModal';
import ProcessPayrollDialog from './ProcessPayrollDialog';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const PayrollTable = ({ activeFilter, searchQuery, onActionSuccess }) => {
  const { payrollRecords, processPayroll } = usePayroll();
  
  const [selectedForView, setSelectedForView] = useState(null);
  const [selectedForEdit, setSelectedForEdit] = useState(null);
  const [selectedForProcess, setSelectedForProcess] = useState(null);

  const filteredRecords = payrollRecords.filter(req => {
    const matchesFilter = activeFilter === 'All' || req.status === activeFilter;
    const matchesSearch = req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    if (status === 'Processed') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const handleProcess = (id) => {
    processPayroll(id);
    setSelectedForProcess(null);
    onActionSuccess("Payroll processed successfully.");
  };

  const handleEditSuccess = () => {
    onActionSuccess("Payroll updated successfully.");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
              <th className="py-4 px-6 font-medium">Employee</th>
              <th className="py-4 px-6 font-medium">Department</th>
              <th className="py-4 px-6 font-medium">Gross Salary</th>
              <th className="py-4 px-6 font-medium">Deductions</th>
              <th className="py-4 px-6 font-medium">Net Salary</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredRecords.map((record) => {
              const gross = calculateGross(record);
              const ded = calculateDeductions(record);
              const net = calculateNet(record);
              
              return (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{record.employeeName}</div>
                    <div className="text-xs font-medium text-slate-500">{record.employeeId}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{record.department}</td>
                  <td className="py-4 px-6 text-slate-900 font-semibold">{formatCurrency(gross)}</td>
                  <td className="py-4 px-6 text-rose-600 font-medium">{formatCurrency(ded)}</td>
                  <td className="py-4 px-6 text-emerald-600 font-bold">{formatCurrency(net)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border inline-block ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedForView(record)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors focus:outline-none"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => setSelectedForEdit(record)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors focus:outline-none"
                      >
                        Edit
                      </button>
                      {record.status === 'Pending' && (
                        <button 
                          onClick={() => setSelectedForProcess(record)}
                          className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors focus:outline-none"
                        >
                          Process
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-500 font-medium">
                  No payroll records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PayslipDetails 
        isOpen={!!selectedForView} 
        record={selectedForView} 
        onClose={() => setSelectedForView(null)} 
      />

      <EditPayrollModal 
        isOpen={!!selectedForEdit}
        record={selectedForEdit}
        onClose={() => setSelectedForEdit(null)}
        onSaveSuccess={handleEditSuccess}
      />

      <ProcessPayrollDialog 
        isOpen={!!selectedForProcess}
        record={selectedForProcess}
        onClose={() => setSelectedForProcess(null)}
        onProcess={handleProcess}
      />

    </div>
  );
};

export default PayrollTable;
