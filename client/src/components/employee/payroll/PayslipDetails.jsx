import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Clock } from 'lucide-react';
import Button from '../../common/Button';
import { calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const PayslipDetails = ({ record, isOpen, onClose }) => {
  const [notification, setNotification] = useState('');

  if (!isOpen || !record) return null;

  const gross = calculateGross(record);
  const deductions = calculateDeductions(record);
  const net = calculateNet(record);

  const handleDownload = () => {
    setNotification('Payslip download will be available after backend integration.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Payslip - {record.month}</h3>
              <p className="text-sm text-slate-500 font-medium">Dayflow HRMS</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2 focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* Notification */}
          {notification && (
            <div className="mb-4 bg-primary-50 text-primary-700 px-4 py-3 rounded-md text-sm font-medium animate-in fade-in slide-in-from-top-2 border border-primary-100">
              {notification}
            </div>
          )}

          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Employee Name</p>
              <p className="text-sm font-medium text-slate-900">{record.employeeName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Employee ID</p>
              <p className="text-sm font-medium text-slate-900">{record.employeeId}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Designation</p>
              <p className="text-sm font-medium text-slate-900">{record.designation}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Department</p>
              <p className="text-sm font-medium text-slate-900">{record.department}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Earnings */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3 uppercase tracking-wide">Earnings</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Basic Salary</span><span className="font-medium text-slate-900">{formatCurrency(record.basicSalary)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Allowances</span><span className="font-medium text-slate-900">{formatCurrency(record.hra + record.specialAllowance + record.otherAllowance)}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold"><span className="text-slate-800">Gross Salary</span><span className="text-slate-900">{formatCurrency(gross)}</span></div>
              </div>
            </div>
            {/* Deductions */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3 uppercase tracking-wide">Deductions</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Provident Fund</span><span className="font-medium text-slate-900">{formatCurrency(record.pf)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Professional Tax</span><span className="font-medium text-slate-900">{formatCurrency(record.professionalTax)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Other Deductions</span><span className="font-medium text-slate-900">{formatCurrency(record.otherDeductions)}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold"><span className="text-slate-800">Total Deductions</span><span className="text-rose-600">{formatCurrency(deductions)}</span></div>
              </div>
            </div>
          </div>

          {/* Net Salary & Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-5 gap-4">
            <div>
              <p className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-1">Net Salary</p>
              <p className="text-3xl font-extrabold text-emerald-700">{formatCurrency(net)}</p>
            </div>
            <div className="text-right flex flex-col sm:items-end w-full sm:w-auto">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 w-max ${record.status === 'Processed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
                {record.status === 'Processed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {record.status}
              </div>
              <p className="text-xs font-medium text-emerald-800/70">
                Payment Date: {record.processedDate || "Pending"}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-white rounded-b-xl">
          <Button variant="outline" onClick={onClose} className="w-auto">Close</Button>
          <Button onClick={handleDownload} className="w-auto">
            <Download className="w-4 h-4 mr-2" />
            Download Payslip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PayslipDetails;
