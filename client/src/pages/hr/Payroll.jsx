import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HRPayrollSummary from '../../components/hr/payroll/PayrollSummary';
import PayrollFilters from '../../components/hr/payroll/PayrollFilters';
import PayrollTable from '../../components/hr/payroll/PayrollTable';

const HRPayroll = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  const handleActionSuccess = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Payroll Management
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Manage employee salaries and payroll processing.
          </p>
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

        <HRPayrollSummary />
        
        <PayrollFilters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <PayrollTable 
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onActionSuccess={handleActionSuccess}
        />

      </div>
    </DashboardLayout>
  );
};

export default HRPayroll;
