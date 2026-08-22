import React from 'react';
import { useLeave } from '../../../context/LeaveContext';

const SummaryCard = ({ title, value, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const LeaveSummary = () => {
  const { leaveRequests } = useLeave();
  // Filter for employee's own requests (mocked as EMP001 for now)
  const myRequests = leaveRequests.filter(r => r.employeeId === "EMP001");
  const pending = myRequests.filter(r => r.status === 'Pending').length;
  const approved = myRequests.filter(r => r.status === 'Approved').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <SummaryCard title="Available Leave" value="12 Days" colorClass="text-slate-900" />
      <SummaryCard title="Used Leave" value="4 Days" colorClass="text-slate-900" />
      <SummaryCard title="Pending Requests" value={pending.toString()} colorClass="text-amber-600" />
      <SummaryCard title="Approved Requests" value={approved.toString()} colorClass="text-emerald-600" />
    </div>
  );
};

export default LeaveSummary;
