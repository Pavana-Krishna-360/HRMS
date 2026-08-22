import React from 'react';
import { CreditCard, CalendarDays, Wallet } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
    <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const PayrollInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">Payment Information</h3>
      <InfoRow icon={Wallet} label="Payment Method" value="Bank Transfer" />
      <InfoRow icon={CalendarDays} label="Pay Frequency" value="Monthly" />
      <InfoRow icon={CreditCard} label="Next Payroll Date" value="August 31, 2026" />
    </div>
  );
};

export default PayrollInfo;
