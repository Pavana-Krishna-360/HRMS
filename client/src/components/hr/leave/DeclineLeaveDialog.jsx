import React, { useState } from 'react';
import Button from '../../common/Button';

const DeclineLeaveDialog = ({ isOpen, onClose, onDecline }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onDecline(reason);
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Decline Leave Request</h3>
        <p className="text-slate-500 text-sm mb-4">Please provide a reason for declining this leave request.</p>
        
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional reason..."
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-6 bg-white placeholder-slate-400"
          rows="3"
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="w-auto">Cancel</Button>
          <Button onClick={handleSubmit} className="w-auto bg-rose-600 hover:bg-rose-700 border-rose-600 text-white">Decline Leave</Button>
        </div>
      </div>
    </div>
  );
};

export default DeclineLeaveDialog;
