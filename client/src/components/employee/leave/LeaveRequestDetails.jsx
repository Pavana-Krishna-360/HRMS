import React from 'react';
import { X, Calendar, User, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const LeaveRequestDetails = ({ request, isOpen, onClose }) => {
  if (!isOpen || !request) return null;

  const getStatusIcon = (status) => {
    if (status === 'Approved') return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    if (status === 'Declined') return <AlertCircle className="w-5 h-5 text-rose-600" />;
    return <Clock className="w-5 h-5 text-amber-600" />;
  };

  const getStatusBg = (status) => {
    if (status === 'Approved') return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    if (status === 'Declined') return 'bg-rose-50 border-rose-200 text-rose-700';
    return 'bg-amber-50 border-amber-200 text-amber-700';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-800/50 backdrop-blur-sm sm:p-4">
      <div className="bg-white h-full sm:h-auto sm:rounded-xl shadow-xl w-full sm:max-w-md overflow-hidden flex flex-col animate-in slide-in-from-right-8 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Request Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-slate-500">ID: {request.id}</span>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${getStatusBg(request.status)}`}>
              {getStatusIcon(request.status)}
              {request.status}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Employee</p>
              <div className="flex items-center gap-2 text-slate-900 font-medium">
                <User className="w-4 h-4 text-slate-400" />
                {request.employeeName} ({request.employeeId})
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Leave Info</p>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="font-semibold text-slate-900 mb-2">{request.leaveType}</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  {request.startDate} to {request.endDate}
                </div>
                <p className="text-sm text-slate-600 font-medium">{request.days} {request.days === 1 ? 'Day' : 'Days'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reason</p>
              <div className="flex gap-2 text-slate-700 text-sm">
                <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>{request.reason}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">HR Comment</p>
              {request.hrComment ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700">
                  "{request.hrComment}"
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No comments yet.</p>
              )}
            </div>

            <div className="text-xs text-slate-400">
              Applied on {request.appliedOn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestDetails;
