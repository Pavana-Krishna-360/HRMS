import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import { X } from 'lucide-react';

const ApplyLeaveModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays > 0 ? diffDays : 0);
    } else {
      setDays(0);
    }
  }, [formData.startDate, formData.endDate]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }
    onSubmit({
      employeeId: "EMP001",
      employeeName: "Sarah Jenkins",
      ...formData,
      days,
      appliedOn: new Date().toISOString().split('T')[0]
    });
    setFormData({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Apply for Leave</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
              <select name="leaveType" value={formData.leaveType} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white">
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
              </div>
            </div>

            {days > 0 && (
              <div className="bg-primary-50 text-primary-700 p-3 rounded-md text-sm font-medium flex justify-between">
                <span>Duration:</span>
                <span>{days} {days === 1 ? 'Day' : 'Days'}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
              <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="3" maxLength="200" className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm placeholder-slate-400" placeholder="Please provide a brief reason for your leave..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Attachment (Optional)</label>
              <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={onClose} className="w-auto">Cancel</Button>
            <Button type="submit" className="w-auto">Submit Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
