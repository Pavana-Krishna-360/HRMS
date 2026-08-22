import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../../common/Button';
import { usePayroll, calculateGross, calculateDeductions, calculateNet } from '../../../context/PayrollContext';

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min="0"
        className="block w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-medium text-slate-900"
      />
    </div>
  </div>
);

const EditPayrollModal = ({ record, isOpen, onClose, onSaveSuccess }) => {
  const { updatePayroll } = usePayroll();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({
        basicSalary: record.basicSalary,
        hra: record.hra,
        specialAllowance: record.specialAllowance,
        otherAllowance: record.otherAllowance,
        pf: record.pf,
        professionalTax: record.professionalTax,
        otherDeductions: record.otherDeductions
      });
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePayroll(record.id, formData);
    onSaveSuccess();
    onClose();
  };

  const tempRecord = { ...record, ...formData };
  const gross = calculateGross(tempRecord);
  const deductions = calculateDeductions(tempRecord);
  const net = calculateNet(tempRecord);
  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Edit Payroll</h3>
            <p className="text-sm text-slate-500 font-medium">{record.employeeName} ({record.month})</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2 focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Earnings */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-2">Earnings</h4>
              <InputField label="Basic Salary" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
              <InputField label="HRA" name="hra" value={formData.hra} onChange={handleChange} />
              <InputField label="Special Allowance" name="specialAllowance" value={formData.specialAllowance} onChange={handleChange} />
              <InputField label="Other Allowances" name="otherAllowance" value={formData.otherAllowance} onChange={handleChange} />
            </div>

            {/* Deductions */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-2">Deductions</h4>
              <InputField label="Provident Fund" name="pf" value={formData.pf} onChange={handleChange} />
              <InputField label="Professional Tax" name="professionalTax" value={formData.professionalTax} onChange={handleChange} />
              <InputField label="Other Deductions" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} />
            </div>
          </div>

          {/* Live Preview */}
          <div className="mt-8 bg-white border border-slate-200 rounded-lg p-5 flex flex-wrap gap-6 justify-between items-center shadow-sm">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Gross</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(gross)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Deductions</p>
              <p className="text-lg font-bold text-rose-600">{formatCurrency(deductions)}</p>
            </div>
            <div className="bg-emerald-50 px-4 py-2 rounded-md border border-emerald-100">
              <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">Net Salary</p>
              <p className="text-2xl font-extrabold text-emerald-700">{formatCurrency(net)}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <Button variant="outline" type="button" onClick={onClose} className="w-auto">Cancel</Button>
            <Button type="submit" className="w-auto bg-primary-600">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPayrollModal;
