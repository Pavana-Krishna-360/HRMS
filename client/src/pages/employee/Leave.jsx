import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LeaveSummary from '../../components/employee/leave/LeaveSummary';
import ApplyLeaveModal from '../../components/employee/leave/ApplyLeaveModal';
import LeaveRequestList from '../../components/employee/leave/LeaveRequestList';
import Button from '../../components/common/Button';
import { Plus } from 'lucide-react';
import { useLeave } from '../../context/LeaveContext';

const EmployeeLeave = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const { applyLeave } = useLeave();

  const handleApplySubmit = (formData) => {
    applyLeave(formData);
    setIsApplyModalOpen(false);
    setNotification('Leave request submitted successfully.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Leave Management
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Apply for leave and track your requests.
            </p>
          </div>
          <Button onClick={() => setIsApplyModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Apply for Leave
          </Button>
        </div>

        {/* Success Alert */}
        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm font-medium flex items-center transition-all animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {notification}
          </div>
        )}

        <LeaveSummary />
        <LeaveRequestList />
        
        <ApplyLeaveModal 
          isOpen={isApplyModalOpen} 
          onClose={() => setIsApplyModalOpen(false)} 
          onSubmit={handleApplySubmit} 
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployeeLeave;
