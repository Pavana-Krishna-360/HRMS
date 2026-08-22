import React from 'react';
import Button from '../../common/Button';

const ApproveLeaveDialog = ({ isOpen, onClose, onApprove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Approve Leave Request</h3>
        <p className="text-slate-500 text-sm mb-6">Are you sure you want to approve this leave request? The employee will be notified.</p>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="w-auto">Cancel</Button>
          <Button onClick={onApprove} className="w-auto bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white">Approve Leave</Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveLeaveDialog;
