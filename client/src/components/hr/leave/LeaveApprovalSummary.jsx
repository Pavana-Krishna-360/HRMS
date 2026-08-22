import React from 'react';
import { useLeave } from '../../../context/LeaveContext';

const SummaryCard = ({ title, value, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const LeaveApprovalSummary = () => {
  const { leaveRequests } = useLeave();
  const pending = leaveRequests.filter(r => r.status === 'Pending').length;
  // Mocking "today" logic by simply counting approved/declined requests in state for now
  const approved = leaveRequests.filter(r => r.status === 'Approved').length;
  const declined = leaveRequests.filter(r => r.status === 'Declined').length;
  const total = leaveRequests.length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <SummaryCard title="Pending Requests" value={pending.toString()} colorClass="text-amber-600" />
      <SummaryCard title="Approved Today" value={approved.toString()} colorClass="text-emerald-600" />
      <SummaryCard title="Declined Today" value={declined.toString()} colorClass="text-rose-600" />
      <SummaryCard title="Total Requests" value={total.toString()} colorClass="text-slate-900" />
    </div>
  );
};

export default LeaveApprovalSummary;
