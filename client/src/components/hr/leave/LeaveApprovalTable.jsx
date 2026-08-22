import React, { useState } from 'react';
import { useLeave } from '../../../context/LeaveContext';
import ApproveLeaveDialog from './ApproveLeaveDialog';
import DeclineLeaveDialog from './DeclineLeaveDialog';
import LeaveRequestDetails from '../../employee/leave/LeaveRequestDetails';

const LeaveApprovalTable = ({ activeFilter, searchQuery, onActionSuccess }) => {
  const { leaveRequests, approveLeave, declineLeave } = useLeave();
  
  const [selectedForDetails, setSelectedForDetails] = useState(null);
  const [selectedForApprove, setSelectedForApprove] = useState(null);
  const [selectedForDecline, setSelectedForDecline] = useState(null);

  const filteredRequests = leaveRequests.filter(req => {
    const matchesFilter = activeFilter === 'All' || req.status === activeFilter;
    const matchesSearch = req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    if (status === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Declined') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const handleApprove = () => {
    if (selectedForApprove) {
      approveLeave(selectedForApprove.id);
      setSelectedForApprove(null);
      onActionSuccess('Leave request approved.');
    }
  };

  const handleDecline = (reason) => {
    if (selectedForDecline) {
      declineLeave(selectedForDecline.id, reason);
      setSelectedForDecline(null);
      onActionSuccess('Leave request declined.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
              <th className="py-4 px-6 font-medium">Employee</th>
              <th className="py-4 px-6 font-medium">Leave Type</th>
              <th className="py-4 px-6 font-medium">Duration</th>
              <th className="py-4 px-6 font-medium">Days</th>
              <th className="py-4 px-6 font-medium">Applied On</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td 
                  className="py-4 px-6 cursor-pointer"
                  onClick={() => setSelectedForDetails(request)}
                >
                  <div className="font-medium text-slate-900">{request.employeeName}</div>
                  <div className="text-xs text-slate-500">{request.employeeId}</div>
                </td>
                <td className="py-4 px-6 text-slate-600">{request.leaveType}</td>
                <td className="py-4 px-6 text-slate-600">{request.startDate} to {request.endDate}</td>
                <td className="py-4 px-6 text-slate-600">{request.days}</td>
                <td className="py-4 px-6 text-slate-600">{request.appliedOn}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium border inline-block ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  {request.status === 'Pending' ? (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedForApprove(request)}
                        className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors focus:outline-none"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => setSelectedForDecline(request)}
                        className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-md hover:bg-rose-100 transition-colors focus:outline-none"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-500">
                  No requests match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ApproveLeaveDialog 
        isOpen={!!selectedForApprove}
        onClose={() => setSelectedForApprove(null)}
        onApprove={handleApprove}
      />
      
      <DeclineLeaveDialog 
        isOpen={!!selectedForDecline}
        onClose={() => setSelectedForDecline(null)}
        onDecline={handleDecline}
      />

      <LeaveRequestDetails 
        isOpen={!!selectedForDetails}
        request={selectedForDetails}
        onClose={() => setSelectedForDetails(null)}
      />
    </div>
  );
};

export default LeaveApprovalTable;
