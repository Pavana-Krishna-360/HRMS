import React, { useState } from 'react';
import { useLeave } from '../../../context/LeaveContext';
import LeaveRequestDetails from './LeaveRequestDetails';

const LeaveRequestList = () => {
  const { leaveRequests } = useLeave();
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter for employee's own requests (mocked as EMP001 for now)
  const myRequests = leaveRequests.filter(r => r.employeeId === "EMP001");

  const getStatusBadge = (status) => {
    if (status === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Declined') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800">My Leave Requests</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-white">
              <th className="py-4 px-6 font-medium">Leave Type</th>
              <th className="py-4 px-6 font-medium">Duration</th>
              <th className="py-4 px-6 font-medium">Days</th>
              <th className="py-4 px-6 font-medium">Reason</th>
              <th className="py-4 px-6 font-medium">Applied On</th>
              <th className="py-4 px-6 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {myRequests.map((request) => (
              <tr 
                key={request.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <td className="py-4 px-6 font-medium text-slate-900">{request.leaveType}</td>
                <td className="py-4 px-6 text-slate-600">{request.startDate} to {request.endDate}</td>
                <td className="py-4 px-6 text-slate-600">{request.days}</td>
                <td className="py-4 px-6 text-slate-600 truncate max-w-[200px]">{request.reason}</td>
                <td className="py-4 px-6 text-slate-600">{request.appliedOn}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border inline-block ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
            {myRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <LeaveRequestDetails 
        isOpen={!!selectedRequest}
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

export default LeaveRequestList;
