import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PayrollSummary from '../../components/employee/payroll/PayrollSummary';
import SalaryBreakdown from '../../components/employee/payroll/SalaryBreakdown';
import PayrollInfo from '../../components/employee/payroll/PayrollInfo';
import PayslipHistory from '../../components/employee/payroll/PayslipHistory';
import { usePayroll } from '../../context/PayrollContext';

const EmployeePayroll = () => {
  const { payrollRecords } = usePayroll();
  // Assume August 2026 is the current active month for the summary
  const currentRecord = payrollRecords.find(r => r.employeeId === "EMP001" && r.month === "August 2026");

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Payroll
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            View your salary details and payslips.
          </p>
        </div>

        <PayrollSummary currentRecord={currentRecord} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalaryBreakdown currentRecord={currentRecord} />
          </div>
          <div>
            <PayrollInfo />
          </div>
        </div>

        <PayslipHistory />

      </div>
    </DashboardLayout>
  );
};

export default EmployeePayroll;
